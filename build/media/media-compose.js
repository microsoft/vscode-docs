'use strict';

const fs = require('fs');
const path = require('path');
const {encodePng, framing, keys} = require('./media-png');
const {runTool, toolPath} = require('./media-tools');

/* eslint-disable security/detect-non-literal-fs-filename -- Text and font inputs are confined to the preparation-owned work directory. */

function frameRange(value, frames, minimum = 1) {
  if (!Number.isInteger(value.startFrame) || !Number.isInteger(value.endFrame) ||
      value.startFrame < 0 || value.endFrame - value.startFrame < minimum || value.endFrame > frames) {
    throw new Error('Invalid composition frame range; endFrame is exclusive.');
  }
}

function textDuration(text, maximum = 54) {
  if (typeof text !== 'string' || text.length > maximum || !/^[\x20-\x7e]+$/.test(text) || !text.trim()) {
    throw new Error(`Composition text must contain 1-${maximum} printable ASCII characters on one line.`);
  }
  return Math.max(25, Math.ceil(text.trim().split(/\s+/).length * 7.5 + 10));
}

function timedText(value, frames) {
  keys(value, ['text', 'startFrame', 'endFrame'], 'composition text');
  frameRange(value, frames, textDuration(value.text));
}

function annotationRange(value, index, frames, recipe) {
  const blend = recipe.annotationStyle === 'blue' ? recipe.transitionFrames : 0;
  return {
    ...value,
    startFrame: Math.max(value.startFrame, index ? blend : 0),
    endFrame: Math.min(value.endFrame, index < recipe.clips.length - 1 ? frames - blend : frames)
  };
}

function focusLayout(crop) {
  let a = crop.width, b = crop.height;
  while (b) [a, b] = [b, a % b];
  const unitWidth = crop.width / a, unitHeight = crop.height / a;
  const multiple = Math.floor(Math.min(1728 / unitWidth, 540 / unitHeight) / 4) * 4;
  if (!multiple) throw new Error('The focus region cannot fit the panel without changing its aspect ratio.');
  const width = unitWidth * multiple, height = unitHeight * multiple;
  return {width, height, x: (1920 - width) / 2, y: (1080 - height) / 2};
}

function roundedDistance(rect, x, y, radius) {
  const dx = Math.abs(x - rect.x - rect.width / 2) - rect.width / 2 + radius;
  const dy = Math.abs(y - rect.y - rect.height / 2) - rect.height / 2 + radius;
  return Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) + Math.min(Math.max(dx, dy), 0) - radius;
}

function emphasisImage(emphasis) {
  const pixels = Buffer.alloc(1920 * 1080 * 4);
  for (let y = 0; y < 1080; y++) {
    for (let x = 0; x < 1920; x++) {
      const offset = (y * 1920 + x) * 4;
      let distance = Infinity;
      for (const rect of emphasis.regions) {
        distance = Math.min(distance, roundedDistance(rect, x, y, Math.min(12, rect.height / 4)));
      }
      const edge = Math.abs(distance);
      if (edge < 2) {
        pixels.set([65, 165, 255, Math.round(245 * Math.min(1, 2 - edge))], offset);
      } else if (distance > 0) {
        const glow = Math.max(0, 1 - distance / 16);
        pixels.set([Math.round(34 * glow), Math.round(105 * glow), Math.round(180 * glow), 158], offset);
      }
      if (roundedDistance({...emphasis.label, height: 68}, x, y, 10) <= 0) {
        pixels.set([8, 111, 199, 255], offset);
      }
    }
  }
  return encodePng({width: 1920, height: 1080, pixels});
}

function compositionRecipe(recipe, sources) {
  keys(recipe, ['format', 'font', 'fontSha256', 'boldFont', 'boldFontSha256', 'transitionFrames', 'annotationStyle', 'playbackRate', 'clips'], 'composition recipe');
  if (recipe.format !== 'mp4' || !path.isAbsolute(recipe.font || '') || !/^[a-f0-9]{64}$/.test(recipe.fontSha256 || '') ||
      ![0, 4, 8].includes(recipe.transitionFrames) ||
      (recipe.annotationStyle !== undefined && recipe.annotationStyle !== 'blue') ||
      (recipe.playbackRate !== undefined && (!Number.isFinite(recipe.playbackRate) || recipe.playbackRate < 0.8 || recipe.playbackRate > 1)) ||
      !Array.isArray(recipe.clips) || recipe.clips.length < 1 ||
      recipe.clips.length > 12 || recipe.clips.length !== sources.length) {
    throw new Error('Composition requires an exact font hash, 1-12 clips, and cuts or four- or eight-frame dissolves.');
  }
  if ((recipe.boldFont !== undefined || recipe.boldFontSha256 !== undefined) &&
      (!path.isAbsolute(recipe.boldFont || '') || !/^[a-f0-9]{64}$/.test(recipe.boldFontSha256 || ''))) {
    throw new Error('The bold font requires an absolute path and exact hash.');
  }
  const clips = recipe.clips.map((clip, index) => {
    keys(clip, ['input', 'sha256', 'capture', 'captureSha256', 'startFrame', 'endFrame', 'crop', 'zoom', 'caption', 'callouts', 'focus', 'emphasis'], 'composition clip');
    if (![clip.input, clip.capture].every(value => typeof value === 'string' && path.isAbsolute(value)) ||
        ![clip.sha256, clip.captureSha256].every(value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value))) {
      throw new Error('Every composition clip requires exact source and capture hashes.');
    }
    const source = sources.at(index);
    frameRange(clip, source.decodedFrames, 25);
    const frames = clip.endFrame - clip.startFrame;
    const crop = framing(source.width, source.height, {format: 'mp4', ...(clip.crop ? {crop: clip.crop} : {})}).crop;
    if (crop.width * 9 !== crop.height * 16) throw new Error('Composition crops must be 16:9 without stretching or letterboxing.');
    let focus;
    if (clip.focus !== undefined) {
      keys(clip.focus, ['crop', 'heading', 'label'], 'composition focus');
      if (!clip.focus.crop) throw new Error('Supply an explicit focus crop.');
      const region = framing(source.width, source.height, {format: 'mp4', crop: clip.focus.crop}).crop;
      if (region.x < crop.x || region.y < crop.y || region.x + region.width > crop.x + crop.width ||
          region.y + region.height > crop.y + crop.height) throw new Error('The focus region must stay inside the context crop.');
      const headingRange = annotationRange({startFrame: 0, endFrame: frames}, index, frames, recipe);
      if (headingRange.endFrame - headingRange.startFrame < textDuration(clip.focus.heading, 36)) {
        throw new Error('The focus heading needs more reading time.');
      }
      if (clip.focus.label !== undefined) timedText(annotationRange(clip.focus.label, index, frames, recipe), frames);
      focusLayout(region);
      focus = {...clip.focus, crop: region};
    }
    const zoomRegion = focus?.crop || crop;
    const zoom = clip.zoom || {from: 1, to: 1, centerX: zoomRegion.width / 2, centerY: zoomRegion.height / 2, frames: 1};
    const zoomDelay = recipe.annotationStyle === 'blue' && index > 0 ? recipe.transitionFrames : 0;
    keys(zoom, ['from', 'to', 'centerX', 'centerY', 'frames'], 'composition zoom');
    if (![zoom.from, zoom.to].every(value => Number.isFinite(value) && value >= 1 && value <= 1.2) ||
        !Number.isInteger(zoom.frames) || zoom.frames < 1 || zoom.frames > Math.min(25, frames - zoomDelay - 1) ||
        !Number.isInteger(zoom.centerX) || !Number.isInteger(zoom.centerY) ||
        zoom.centerX < 0 || zoom.centerY < 0 || zoom.centerX > zoomRegion.width || zoom.centerY > zoomRegion.height) {
      throw new Error('Zoom must stay within 1-1.2x, settle within 25 frames, and use a center inside the crop.');
    }
    if (clip.caption) {
      timedText(annotationRange(clip.caption, index, frames, recipe), frames);
    }
    if (clip.emphasis) {
      const e = clip.emphasis;
      keys(e, ['regions', 'label', 'heading', 'startFrame', 'endFrame'], 'composition emphasis');
      if (recipe.annotationStyle !== 'blue' || !path.isAbsolute(recipe.boldFont || '') ||
          !/^[a-f0-9]{64}$/.test(recipe.boldFontSha256 || '') || clip.focus || clip.caption || clip.callouts?.length ||
          !Array.isArray(e.regions) || e.regions.length < 1 || e.regions.length > 3) {
        throw new Error('Emphasis requires blue style, an exact bold font, 1-3 regions, and no competing annotations.');
      }
      for (const rect of e.regions) {
        keys(rect, ['x', 'y', 'width', 'height'], 'emphasis region');
        framing(1920, 1080, {format: 'png', crop: rect});
        if (rect.width < 24 || rect.height < 24) throw new Error('Emphasis regions must be at least 24 pixels per side.');
      }
      keys(e.label, ['text', 'x', 'y', 'width'], 'emphasis label');
      framing(1920, 1080, {format: 'png', crop: {x: e.label.x, y: e.label.y, width: e.label.width, height: 68}});
      const range = annotationRange(e, index, frames, recipe);
      frameRange(range, frames, textDuration(e.label.text));
      if (e.label.width < 160 || e.label.width > 1400) throw new Error('Emphasis label width must be 160-1400 pixels.');
      if (zoom.from !== zoom.to && range.startFrame < zoomDelay + zoom.frames) {
        throw new Error('Show emphasis only after the camera settles.');
      }
      if (e.heading) {
        keys(e.heading, ['text', 'x', 'y'], 'emphasis heading');
        framing(1920, 1080, {format: 'png', crop: {x: e.heading.x, y: e.heading.y, width: 40, height: 60}});
        frameRange(range, frames, textDuration(e.heading.text, 36));
      }
    }
    const callouts = clip.callouts ?? [];
    if (!Array.isArray(callouts) || callouts.length > 4) throw new Error('Use at most four callouts per clip.');
    for (const callout of callouts) {
      keys(callout, ['x', 'y', 'width', 'height', 'startFrame', 'endFrame'], 'composition callout');
      if (![callout.x, callout.y, callout.width, callout.height].every(Number.isInteger) ||
          callout.x < 0 || callout.y < 0 || callout.width <= 4 || callout.height <= 4 ||
          callout.x + callout.width > 1920 || callout.y + callout.height > 1080) {
        throw new Error('Callouts must fit the final 1920x1080 frame.');
      }
      frameRange(annotationRange(callout, index, frames, recipe), frames, 25);
      if (zoom.from !== zoom.to && callout.startFrame < zoomDelay + zoom.frames) {
        throw new Error('Show callouts only after the camera settles.');
      }
    }
    return {...clip, crop, zoom, callouts, ...(focus ? {focus} : {})};
  });
  const timelineFrames = clips.reduce((sum, clip) => sum + clip.endFrame - clip.startFrame, 0) -
    recipe.transitionFrames * (clips.length - 1);
  const frames = Math.floor(timelineFrames / (recipe.playbackRate ?? 1));
  if (frames < 100 || frames >= 1500) throw new Error('The composed video must be at least four seconds and strictly under one minute.');
  return {recipe: {...recipe, clips}, frames};
}

function renderComposition(recipe, frames, output, work, tools, run = runTool) {
  fs.copyFileSync(recipe.font, path.join(work, 'font.ttf'), fs.constants.COPYFILE_EXCL);
  if (recipe.boldFont) fs.copyFileSync(recipe.boldFont, path.join(work, 'bold.ttf'), fs.constants.COPYFILE_EXCL);
  const filters = [];
  const blue = recipe.annotationStyle === 'blue';
  const enable = value => `enable='gte(n,${value.startFrame})*lt(n,${value.endFrame})'`;
  for (const [index, clip] of recipe.clips.entries()) {
    const {crop: c, zoom: z} = clip;
    const annotation = value => enable(annotationRange(value, index, clip.endFrame - clip.startFrame, recipe));
    const elapsed = blue && index > 0 ? `max(0,on-${recipe.transitionFrames})` : 'on';
    const zoom = `${z.from}+(${z.to - z.from})*(1-pow(1-min(${elapsed}/${z.frames},1),3))`;
    const camera = (width, height) =>
      `zoompan=z='${zoom}':x='max(0,min(iw-iw/zoom,${z.centerX}-iw/(2*zoom)))':y='max(0,min(ih-ih/zoom,${z.centerY}-ih/(2*zoom)))':d=1:s=${width}x${height}:fps=25`;
    const text = (kind, content, style, bold = false) => {
      const name = `${kind}-${index}.txt`;
      fs.writeFileSync(path.join(work, name), content, {flag: 'wx'});
      return `drawtext=fontfile=${bold ? 'bold.ttf' : 'font.ttf'}:textfile=${name}:expansion=none:fontcolor=white:${style}`;
    };
    const trim = [`trim=start_frame=${clip.startFrame}:end_frame=${clip.endFrame}`, 'setpts=PTS-STARTPTS', 'settb=1/25'];
    let input = `[${index}:v]`, panel;
    let parts;
    if (clip.focus) {
      const {crop: f, heading, label} = clip.focus;
      panel = focusLayout(f);
      filters.push(`${input}${trim.join(',')},split=2[context${index}][detail${index}]`);
      filters.push(`[context${index}]crop=${c.width}:${c.height}:${c.x}:${c.y},scale=1920:1080,setsar=1,` +
        `boxblur=12:1,lutrgb=r=val*0.25:g=val*0.25:b=val*0.25,format=yuv420p[back${index}]`);
      filters.push(`[detail${index}]crop=${f.width}:${f.height}:${f.x}:${f.y},${camera(panel.width, panel.height)},setsar=1,format=yuv420p[panel${index}]`);
      input = `[back${index}][panel${index}]`;
      parts = [
        `overlay=x=${panel.x}:y=${panel.y}:shortest=1`, 'format=yuv420p',
        text('heading', heading, `fontsize=48:x=96:y=80:${annotation({startFrame: 0, endFrame: clip.endFrame - clip.startFrame})}`)
      ];
      if (label) parts.push(
        `drawbox=x=${panel.x}:y=${panel.y}:w=${panel.width}:h=${panel.height}:color=0x007ACC:t=2:${annotation(label)}`,
        text('label', label.text, `fontsize=32:x=(w-text_w)/2:y=${panel.y - 56}:box=1:boxcolor=0x007ACC:boxborderw=12:${annotation(label)}`)
      );
    } else {
      parts = [...trim, `crop=${c.width}:${c.height}:${c.x}:${c.y}`, camera(1920, 1080), 'setsar=1', 'format=yuv420p'];
    }
    parts.push(...clip.callouts.map(r =>
      `drawbox=x=${r.x}:y=${r.y}:w=${r.width}:h=${r.height}:color=${blue ? '0x007ACC' : 'red'}:t=2:${annotation(r)}`));
    if (clip.caption) {
      const position = panel ? `x=(w-text_w)/2:y=${panel.y + panel.height + 70}` : 'x=40:y=1000';
      parts.push(text('caption', clip.caption.text,
        `fontsize=32:${position}:box=1:boxcolor=${blue ? '0x007ACC' : 'black@0.8'}:boxborderw=12:${annotation(clip.caption)}`));
    }
    if (clip.emphasis) {
      const e = clip.emphasis, l = e.label, timing = annotation(e);
      const name = `emphasis-${index}.png`;
      fs.writeFileSync(path.join(work, name), emphasisImage(e), {flag: 'wx'});
      filters.push(`${input}${parts.join(',')}[base${index}]`);
      filters.push(`movie=${name}:dec_threads=1,format=rgba[emphasis${index}]`);
      const labels = [
        `overlay=shortest=0:eof_action=repeat:${timing}`,
        text('emphasis-label', l.text, `fontsize=36:x=${l.x}+(${l.width}-text_w)/2:y=${l.y}+18:${timing}`, true)
      ];
      if (e.heading) labels.push(text('emphasis-heading', e.heading.text,
        `fontsize=44:x=${e.heading.x}:y=${e.heading.y}:shadowcolor=black:shadowx=2:shadowy=2:box=1:boxcolor=black@0.8:boxborderw=12:${timing}`, true));
      filters.push(`[base${index}][emphasis${index}]${labels.join(',')}[clip${index}]`);
    } else {
      filters.push(`${input}${parts.join(',')}[clip${index}]`);
    }
  }
  let previous = 'clip0', elapsed = recipe.clips[0].endFrame - recipe.clips[0].startFrame;
  for (let index = 1; index < recipe.clips.length; index++) {
    const join = `join${index}`;
    const transition = recipe.transitionFrames ?
      `xfade=transition=fade:duration=${recipe.transitionFrames / 25}:offset=${(elapsed - recipe.transitionFrames) / 25}` :
      'concat=n=2:v=1:a=0';
    filters.push(`[${previous}][clip${index}]${transition}[${join}]`);
    previous = join;
    const clip = recipe.clips.at(index);
    elapsed += clip.endFrame - clip.startFrame - recipe.transitionFrames;
  }
  const pacing = recipe.playbackRate && recipe.playbackRate !== 1
    ? `settb=AVTB,setpts=(PTS-STARTPTS)/${recipe.playbackRate},fps=25,` : '';
  filters.push(`[${previous}]${pacing}trim=end_frame=${frames},setpts=PTS-STARTPTS,format=yuv420p[out]`);
  const inputs = recipe.clips.flatMap(clip => ['-threads', '1', '-protocol_whitelist', 'file,pipe', '-i', clip.input]);
  run(toolPath(tools.ffmpeg, 'ffmpeg'), [
    '-nostdin', '-hide_banner', '-n', '-xerror', '-err_detect', 'explode', ...inputs,
    '-filter_complex_threads', '1', '-filter_complex', filters.join(';'), '-map', '[out]',
    '-an', '-sn', '-dn', '-map_metadata', '-1', '-map_chapters', '-1', '-r', '25', '-fps_mode', 'cfr',
    '-frames:v', String(frames), '-c:v', 'libx264', '-threads', '2', '-crf', '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output
  ], {cwd: work});
}

module.exports = {compositionRecipe, renderComposition};
