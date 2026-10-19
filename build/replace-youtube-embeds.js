// Replaces YouTube iframe embeds with locally stored, linked thumbnails.
// Usage: node build/replace-youtube-embeds.js [--write] <file-or-directory> [...]

/* eslint-disable security/detect-non-literal-fs-filename -- All content paths are constrained to the repository root. */

const fs = require('fs');
const https = require('https');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const GENERIC_TITLES = new Set(['video', 'video player', 'youtube video', 'youtube video player']);
const THUMBNAIL_QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault'];
const EXCLUDED_DIRECTORIES = new Set(['.git', 'node_modules']);
const MAX_DOWNLOAD_BYTES = 10 * 1024 * 1024;

function decodeHtml(value) {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, function (_, code) {
      return String.fromCharCode(Number(code));
    })
    .replace(/&#x([0-9a-f]+);/gi, function (_, code) {
      return String.fromCharCode(parseInt(code, 16));
    });
}

function parseAttributes(tag) {
  const attributes = new Map();
  let index = tag.toLowerCase().indexOf('<iframe') + '<iframe'.length;

  while (index < tag.length) {
    while (index < tag.length && /\s/.test(tag.charAt(index))) {
      index++;
    }
    if (tag.charAt(index) === '>' || tag.substring(index, index + 2) === '/>') {
      break;
    }

    const nameStart = index;
    while (index < tag.length && /[:\w-]/.test(tag.charAt(index))) {
      index++;
    }
    if (index === nameStart) {
      index++;
      continue;
    }

    const name = tag.substring(nameStart, index).toLowerCase();
    while (index < tag.length && /\s/.test(tag.charAt(index))) {
      index++;
    }
    if (tag.charAt(index) !== '=') {
      continue;
    }

    index++;
    while (index < tag.length && /\s/.test(tag.charAt(index))) {
      index++;
    }

    const quote = tag.charAt(index);
    let value;
    if (quote === '"' || quote === "'") {
      const valueStart = ++index;
      while (index < tag.length && tag.charAt(index) !== quote) {
        index++;
      }
      value = tag.substring(valueStart, index);
      index++;
    } else {
      const valueStart = index;
      while (index < tag.length && !/[\s>]/.test(tag.charAt(index))) {
        index++;
      }
      value = tag.substring(valueStart, index);
    }

    attributes.set(name, decodeHtml(value));
  }

  return attributes;
}

function getVideoId(url) {
  const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
  const pathParts = url.pathname.split('/').filter(Boolean);

  if ((hostname === 'youtube.com' || hostname === 'youtube-nocookie.com') && pathParts[0] === 'embed') {
    return pathParts[1];
  }

  if (hostname === 'youtu.be') {
    return pathParts[0];
  }

  return undefined;
}

function isGenericTitle(title) {
  return GENERIC_TITLES.has(title.toLowerCase().replace(/\.$/, '').trim());
}

function parseYouTubeIframe(iframe) {
  const attributes = parseAttributes(iframe);
  const source = attributes.get('src');
  let sourceUrl;

  if (!source) {
    return { isYouTube: false };
  }

  try {
    sourceUrl = new URL(source);
  } catch (error) {
    return { isYouTube: false };
  }

  const videoId = getVideoId(sourceUrl);
  if (!videoId) {
    return { isYouTube: false };
  }

  if (!VIDEO_ID_PATTERN.test(videoId)) {
    return {
      isYouTube: true,
      error: `Invalid YouTube video ID "${videoId}".`
    };
  }

  const title = (attributes.get('title') || '').replace(/\s+/g, ' ').trim();
  if (!title || isGenericTitle(title)) {
    return {
      isYouTube: true,
      issueCode: 'missing-title',
      videoId,
      error: `Video ${videoId} needs a meaningful iframe title before it can be migrated.`
    };
  }

  return {
    isYouTube: true,
    videoId,
    title
  };
}

function getThumbnailPath(markdownPath, videoId, root) {
  const relativeMarkdownPath = path.relative(root || ROOT, path.resolve(markdownPath));
  if (relativeMarkdownPath.split(path.sep)[0] === 'blogs') {
    return path.join(path.dirname(markdownPath), `youtube-${videoId}.jpg`);
  }

  const articleName = path.basename(markdownPath, path.extname(markdownPath));
  return path.join(path.dirname(markdownPath), 'images', articleName, `youtube-${videoId}.jpg`);
}

function renderLinkedThumbnail(embed, imagePath, markdownPath) {
  const relativeImagePath = path.relative(path.dirname(markdownPath), imagePath).split(path.sep).join('/');
  const title = embed.title.replace(/\.$/, '');
  const accessibleName = `Watch ${title} on YouTube (opens in new tab).`;
  const escapedAccessibleName = accessibleName.replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');

  return `[![${escapedAccessibleName}](${relativeImagePath})](https://www.youtube.com/watch?v=${embed.videoId})`;
}

function findIframeRanges(content) {
  const lowerContent = content.toLowerCase();
  const ranges = [];
  let searchIndex = 0;

  while (searchIndex < content.length) {
    const start = lowerContent.indexOf('<iframe', searchIndex);
    if (start === -1) {
      break;
    }

    const boundary = lowerContent.charAt(start + '<iframe'.length);
    if (boundary && !/[\s>]/.test(boundary)) {
      searchIndex = start + '<iframe'.length;
      continue;
    }

    const closingStart = lowerContent.indexOf('</iframe', start + '<iframe'.length);
    if (closingStart === -1) {
      break;
    }
    const closingEnd = lowerContent.indexOf('>', closingStart + '</iframe'.length);
    if (closingEnd === -1) {
      break;
    }

    ranges.push({
      end: closingEnd + 1,
      start
    });
    searchIndex = closingEnd + 1;
  }

  return ranges;
}

function analyzeMarkdown(markdownPath, content, titleOverrides, root) {
  const embeds = [];
  const issues = [];
  let output = '';
  let lastIndex = 0;

  findIframeRanges(content).forEach(function (range) {
    const iframe = content.substring(range.start, range.end);
    let parsed = parseYouTubeIframe(iframe);
    if (!parsed.isYouTube) {
      return;
    }

    if (parsed.issueCode === 'missing-title' && titleOverrides && titleOverrides.has(parsed.videoId)) {
      parsed = {
        isYouTube: true,
        title: titleOverrides.get(parsed.videoId),
        videoId: parsed.videoId
      };
    }

    if (parsed.error) {
      issues.push({
        code: parsed.issueCode,
        file: markdownPath,
        line: content.substring(0, range.start).split('\n').length,
        message: parsed.error,
        videoId: parsed.videoId
      });
      return;
    }

    const imagePath = getThumbnailPath(markdownPath, parsed.videoId, root);
    output += content.substring(lastIndex, range.start);
    output += renderLinkedThumbnail(parsed, imagePath, markdownPath);
    lastIndex = range.end;
    embeds.push({
      videoId: parsed.videoId,
      imagePath
    });
  });

  output += content.substring(lastIndex);

  return {
    content: embeds.length > 0 ? output : content,
    embeds,
    issues
  };
}

function isWithinRoot(candidatePath, root) {
  const relativePath = path.relative(root, candidatePath);
  return relativePath === '' || (!relativePath.startsWith(`..${path.sep}`) && relativePath !== '..' && !path.isAbsolute(relativePath));
}

function collectMarkdownFiles(inputs, root) {
  const files = new Set();
  const visitedDirectories = new Set();
  const canonicalRoot = fs.realpathSync(root);

  function visit(candidatePath, explicit) {
    const absolutePath = path.resolve(candidatePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Path does not exist: ${candidatePath}`);
    }

    const canonicalPath = fs.realpathSync(absolutePath);
    if (!isWithinRoot(canonicalPath, canonicalRoot)) {
      throw new Error(`Path must be inside ${canonicalRoot}: ${candidatePath}`);
    }

    const stat = fs.statSync(canonicalPath);
    if (stat.isFile()) {
      if (path.extname(canonicalPath).toLowerCase() !== '.md') {
        if (explicit) {
          throw new Error(`Expected a Markdown file: ${candidatePath}`);
        }
        return;
      }
      files.add(canonicalPath);
      return;
    }
    if (!stat.isDirectory()) {
      throw new Error(`Unsupported path: ${candidatePath}`);
    }

    if (visitedDirectories.has(canonicalPath)) {
      return;
    }
    visitedDirectories.add(canonicalPath);

    fs.readdirSync(canonicalPath, { withFileTypes: true })
      .filter(function (entry) {
        return !EXCLUDED_DIRECTORIES.has(entry.name);
      })
      .forEach(function (entry) {
        visit(path.join(canonicalPath, entry.name), false);
      });
  }

  inputs.forEach(function (input) {
    visit(input, true);
  });
  return Array.from(files).sort();
}

function isJpeg(data) {
  return data.length >= 4 &&
    data[0] === 0xff &&
    data[1] === 0xd8 &&
    data[data.length - 2] === 0xff &&
    data[data.length - 1] === 0xd9;
}

function requestBuffer(url, redirectsRemaining) {
  const redirects = redirectsRemaining === undefined ? 5 : redirectsRemaining;

  return new Promise(function (resolve, reject) {
    const request = https.get(url, function (response) {
      const statusCode = response.statusCode || 0;
      const location = response.headers.location;

      if (statusCode >= 300 && statusCode < 400 && location) {
        response.resume();
        if (redirects === 0) {
          reject(new Error(`Too many redirects while downloading ${url}`));
          return;
        }
        requestBuffer(new URL(location, url).toString(), redirects - 1).then(resolve, reject);
        return;
      }

      if (statusCode !== 200) {
        response.resume();
        reject(new Error(`HTTP ${statusCode} from ${url}`));
        return;
      }

      const chunks = [];
      let totalBytes = 0;

      response.on('data', function (chunk) {
        totalBytes += chunk.length;
        if (totalBytes > MAX_DOWNLOAD_BYTES) {
          request.destroy(new Error(`Thumbnail exceeds ${MAX_DOWNLOAD_BYTES} bytes.`));
          return;
        }
        chunks.push(chunk);
      });
      response.on('end', function () {
        resolve({
          contentType: response.headers['content-type'] || '',
          data: Buffer.concat(chunks)
        });
      });
      response.on('error', reject);
    });

    request.setTimeout(15000, function () {
      request.destroy(new Error(`Timed out downloading ${url}`));
    });
    request.on('error', reject);
  });
}

function downloadBestThumbnail(videoId, getBuffer) {
  const fetchBuffer = getBuffer || requestBuffer;
  const failures = [];
  const qualities = THUMBNAIL_QUALITIES.slice();

  function tryQuality() {
    const quality = qualities.shift();
    if (!quality) {
      throw new Error(`Unable to download a JPEG thumbnail for ${videoId}: ${failures.join('; ')}`);
    }

    const url = `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;

    return fetchBuffer(url).then(function (result) {
      if (!/^image\/jpeg(?:;|$)/i.test(result.contentType) || !isJpeg(result.data)) {
        throw new Error(`Invalid JPEG response from ${url}`);
      }
      return {
        data: result.data,
        quality,
        url
      };
    }).catch(function (error) {
      failures.push(`${quality}: ${error.message}`);
      return tryQuality();
    });
  }

  return tryQuality();
}

function downloadVideoTitle(videoId, getBuffer) {
  const fetchBuffer = getBuffer || requestBuffer;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;

  return fetchBuffer(url).then(function (result) {
    if (!/^application\/json(?:;|$)/i.test(result.contentType)) {
      throw new Error(`Invalid oEmbed response type for ${videoId}: ${result.contentType || 'missing'}`);
    }

    let metadata;
    try {
      metadata = JSON.parse(result.data.toString('utf8'));
    } catch (error) {
      throw new Error(`Invalid oEmbed JSON for ${videoId}: ${error.message}`);
    }

    const title = typeof metadata.title === 'string' ? metadata.title.replace(/\s+/g, ' ').trim() : '';
    if (!title || isGenericTitle(title)) {
      throw new Error(`YouTube oEmbed did not provide a meaningful title for ${videoId}.`);
    }

    return title;
  });
}

function resolveIssueTitles(issues, getBuffer, logger) {
  const videoIds = Array.from(new Set(issues.map(function (issue) {
    return issue.videoId;
  })));
  const titles = new Map();

  return videoIds.reduce(function (promise, videoId) {
    return promise.then(function () {
      return downloadVideoTitle(videoId, getBuffer).then(function (title) {
        titles.set(videoId, title);
        logger(`Resolved title for ${videoId}: ${title}`);
      });
    });
  }, Promise.resolve()).then(function () {
    return titles;
  });
}

function prepareMigration(files, titleOverrides, root) {
  const filePlans = [];
  const downloads = new Map();
  const issues = [];
  let embedCount = 0;

  files.forEach(function (file) {
    const originalContent = fs.readFileSync(file, 'utf8');
    const analysis = analyzeMarkdown(file, originalContent, titleOverrides, root);

    embedCount += analysis.embeds.length;
    issues.push.apply(issues, analysis.issues);

    if (analysis.embeds.length > 0) {
      filePlans.push({
        file,
        content: analysis.content
      });
      analysis.embeds.forEach(function (embed) {
        downloads.set(embed.imagePath, embed.videoId);
      });
    }
  });

  return {
    downloads,
    embedCount,
    filePlans,
    issues
  };
}

function validateExistingImages(downloads) {
  downloads.forEach(function (videoId, imagePath) {
    if (fs.existsSync(imagePath) && !isJpeg(fs.readFileSync(imagePath))) {
      throw new Error(`Existing thumbnail is not a valid JPEG for ${videoId}: ${imagePath}`);
    }
  });
}

function stageDownloads(downloads, getBuffer, logger) {
  const staged = [];
  const pending = [];

  downloads.forEach(function (videoId, imagePath) {
    if (!fs.existsSync(imagePath)) {
      pending.push({ imagePath, videoId });
    }
  });

  function cleanup() {
    staged.forEach(function (item) {
      if (fs.existsSync(item.temporaryPath)) {
        fs.unlinkSync(item.temporaryPath);
      }
    });
  }

  return pending.reduce(function (promise, item, index) {
    return promise.then(function () {
      return downloadBestThumbnail(item.videoId, getBuffer).then(function (thumbnail) {
        fs.mkdirSync(path.dirname(item.imagePath), { recursive: true });
        const temporaryPath = `${item.imagePath}.tmp-${process.pid}-${index}`;
        fs.writeFileSync(temporaryPath, thumbnail.data);
        staged.push({
          imagePath: item.imagePath,
          temporaryPath
        });
        logger(`Downloaded ${item.videoId} (${thumbnail.quality}).`);
      });
    });
  }, Promise.resolve()).then(function () {
    return staged;
  }).catch(function (error) {
    cleanup();
    throw error;
  });
}

function commitMigration(filePlans, stagedDownloads) {
  const temporaryMarkdownFiles = [];

  try {
    filePlans.forEach(function (plan, index) {
      const temporaryPath = `${plan.file}.tmp-${process.pid}-${index}`;
      fs.writeFileSync(temporaryPath, plan.content, 'utf8');
      temporaryMarkdownFiles.push({
        file: plan.file,
        temporaryPath
      });
    });

    stagedDownloads.forEach(function (item) {
      fs.renameSync(item.temporaryPath, item.imagePath);
    });
    temporaryMarkdownFiles.forEach(function (item) {
      fs.renameSync(item.temporaryPath, item.file);
    });
  } catch (error) {
    stagedDownloads.concat(temporaryMarkdownFiles).forEach(function (item) {
      if (fs.existsSync(item.temporaryPath)) {
        fs.unlinkSync(item.temporaryPath);
      }
    });
    throw error;
  }
}

function formatSummary(summary, write) {
  const action = write ? 'Replaced' : 'Would replace';
  return `Found ${summary.foundCount} YouTube embed(s). ${action} ${summary.embedCount} embed(s) in ` +
    `${summary.filePlans.length} file(s) with ${summary.downloads.size} local thumbnail(s); ` +
    `${summary.issueCount} embed(s) need attention; scanned ${summary.fileCount} Markdown file(s).`;
}

function createSummary(plan, fileCount) {
  const summary = {
    downloads: plan.downloads,
    embedCount: plan.embedCount,
    fileCount,
    filePlans: plan.filePlans,
    foundCount: plan.embedCount,
    issueCount: plan.issues.length
  };
  summary.foundCount += summary.issueCount;

  return summary;
}

function executeMigration(plan, options, files, root, logger) {
  const summary = createSummary(plan, files.length);

  if (summary.issueCount > 0) {
    plan.issues.forEach(function (issue) {
      logger(`${path.relative(root, issue.file)}:${issue.line}: ${issue.message}`);
    });
    logger(formatSummary(summary, false));
    return Promise.reject(new Error(`Migration stopped with ${plan.issues.length} accessibility issue(s).`));
  }

  validateExistingImages(plan.downloads);

  if (!options.write) {
    logger(formatSummary(summary, false));
    return Promise.resolve(summary);
  }

  return stageDownloads(plan.downloads, options.getBuffer, logger).then(function (stagedDownloads) {
    commitMigration(plan.filePlans, stagedDownloads);
    logger(formatSummary(summary, true));
    return summary;
  });
}

function runMigration(options) {
  const logger = options.logger || console.log;
  const root = path.resolve(options.root || ROOT);
  const files = collectMarkdownFiles(options.inputs, root);
  const initialPlan = prepareMigration(files, undefined, root);

  if (options.write && initialPlan.issues.length > 0) {
    const unresolvableIssues = initialPlan.issues.filter(function (issue) {
      return issue.code !== 'missing-title';
    });
    if (unresolvableIssues.length > 0) {
      return executeMigration(initialPlan, options, files, root, logger);
    }

    return resolveIssueTitles(initialPlan.issues, options.getMetadataBuffer, logger).then(function (titles) {
      return executeMigration(prepareMigration(files, titles, root), options, files, root, logger);
    });
  }

  return executeMigration(initialPlan, options, files, root, logger);
}

function printUsage() {
  console.log([
    'Usage: npm run replace-youtube-embeds -- [--write] <file-or-directory> [...]',
    '',
    'Runs in dry-run mode unless --write is provided.'
  ].join('\n'));
}

function parseArguments(argv) {
  const options = {
    inputs: [],
    write: false
  };

  argv.forEach(function (argument) {
    if (argument === '--write') {
      options.write = true;
    } else if (argument === '--help' || argument === '-h') {
      options.help = true;
    } else if (argument.startsWith('-')) {
      throw new Error(`Unknown option: ${argument}`);
    } else {
      options.inputs.push(argument);
    }
  });

  return options;
}

function main() {
  let options;

  try {
    options = parseArguments(process.argv.slice(2));
    if (options.help) {
      printUsage();
      return;
    }
    if (options.inputs.length === 0) {
      throw new Error('Provide at least one Markdown file or directory.');
    }
  } catch (error) {
    console.error(error.message);
    printUsage();
    process.exitCode = 1;
    return;
  }

  runMigration(options).catch(function (error) {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = {
  analyzeMarkdown,
  collectMarkdownFiles,
  downloadBestThumbnail,
  downloadVideoTitle,
  isJpeg,
  parseArguments,
  parseYouTubeIframe,
  renderLinkedThumbnail,
  runMigration
};

if (require.main === module) {
  main();
}
