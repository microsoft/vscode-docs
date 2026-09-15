const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use paths under isolated temporary directories. */

const {
  analyzeMarkdown,
  downloadBestThumbnail,
  downloadVideoTitle,
  parseYouTubeIframe,
  renderLinkedThumbnail,
  runMigration
} = require('./replace-youtube-embeds');

const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0xff, 0xd9]);

test('parses supported YouTube iframe variants', function () {
  const iframe = [
    '<iframe',
    ' title="Video showing &quot;debugging&quot; in VS Code."',
    " height='315'",
    ' src="https://www.youtube-nocookie.com/embed/3HiLLByBWkg?rel=0&amp;start=10"',
    ' width=560>',
    '</iframe>'
  ].join('\n');

  assert.deepEqual(parseYouTubeIframe(iframe), {
    isYouTube: true,
    videoId: '3HiLLByBWkg',
    title: 'Video showing "debugging" in VS Code.'
  });
});

test('rejects generic iframe titles', function () {
  assert.deepEqual(
    parseYouTubeIframe('<iframe src="https://youtu.be/3HiLLByBWkg" title="YouTube video player"></iframe>'),
    {
      isYouTube: true,
      issueCode: 'missing-title',
      videoId: '3HiLLByBWkg',
      error: 'Video 3HiLLByBWkg needs a meaningful iframe title before it can be migrated.'
    }
  );
});

test('renders an accessible Markdown thumbnail link', function () {
  const markdownPath = path.join('docs', 'debugtest', 'debugging.md');
  const imagePath = path.join('docs', 'debugtest', 'images', 'debugging', 'youtube-3HiLLByBWkg.jpg');
  const output = renderLinkedThumbnail({
    videoId: '3HiLLByBWkg',
    title: 'Video showing "debugging" in [VS Code].'
  }, imagePath, markdownPath);

  assert.equal(
    output,
    '[![Watch Video showing "debugging" in \\[VS Code\\] on YouTube (opens in new tab).](images/debugging/youtube-3HiLLByBWkg.jpg)](https://www.youtube.com/watch?v=3HiLLByBWkg)'
  );
});

test('stores blog thumbnails beside the Markdown file', function () {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'youtube-embed-blog-'));
  const blogDirectory = path.join(root, 'blogs', '2026', '09', '04');
  const markdownPath = path.join(blogDirectory, 'article.md');

  fs.mkdirSync(blogDirectory, { recursive: true });
  fs.writeFileSync(markdownPath, '<iframe src="https://www.youtube.com/embed/3HiLLByBWkg" title="Video showing debugging."></iframe>\n');

  return runMigration({
    getBuffer: function () {
      return Promise.resolve({ contentType: 'image/jpeg', data: JPEG });
    },
    inputs: [markdownPath],
    logger: function () {},
    root,
    write: true
  }).then(function () {
    assert.match(fs.readFileSync(markdownPath, 'utf8'), /\]\(youtube-3HiLLByBWkg\.jpg\)\]\(https:\/\/www\.youtube\.com/);
    assert.equal(fs.existsSync(path.join(blogDirectory, 'youtube-3HiLLByBWkg.jpg')), true);
    assert.equal(fs.existsSync(path.join(blogDirectory, 'images')), false);
  }).finally(function () {
    fs.rmSync(root, { recursive: true, force: true });
  });
});

test('falls back to the next valid JPEG thumbnail', function () {
  const requestedUrls = [];

  return downloadBestThumbnail('3HiLLByBWkg', function (url) {
    requestedUrls.push(url);
    if (url.includes('maxresdefault')) {
      return Promise.reject(new Error('HTTP 404'));
    }
    return Promise.resolve({
      contentType: 'image/jpeg',
      data: JPEG
    });
  }).then(function (thumbnail) {
    assert.equal(thumbnail.quality, 'sddefault');
    assert.equal(requestedUrls.length, 2);
  });
});

test('resolves a meaningful title from YouTube oEmbed metadata', function () {
  return downloadVideoTitle('3HiLLByBWkg', function (url) {
    assert.match(url, /^https:\/\/www\.youtube\.com\/oembed\?/);
    return Promise.resolve({
      contentType: 'application/json; charset=utf-8',
      data: Buffer.from(JSON.stringify({ title: 'Getting Started with Debugging in VS Code' }))
    });
  }).then(function (title) {
    assert.equal(title, 'Getting Started with Debugging in VS Code');
  });
});

test('write mode resolves generic titles before migrating', function () {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'youtube-embed-title-'));
  const markdownPath = path.join(root, 'article.md');
  const original = '<iframe src="https://www.youtube.com/embed/3HiLLByBWkg" title="YouTube video player"></iframe>\n';

  fs.writeFileSync(markdownPath, original);

  return runMigration({
    getBuffer: function () {
      return Promise.resolve({ contentType: 'image/jpeg', data: JPEG });
    },
    getMetadataBuffer: function () {
      return Promise.resolve({
        contentType: 'application/json',
        data: Buffer.from(JSON.stringify({ title: 'Getting Started with Debugging in VS Code' }))
      });
    },
    inputs: [markdownPath],
    logger: function () {},
    root,
    write: true
  }).then(function () {
    assert.match(fs.readFileSync(markdownPath, 'utf8'), /Watch Getting Started with Debugging in VS Code on YouTube/);
  }).finally(function () {
    fs.rmSync(root, { recursive: true, force: true });
  });
});

test('dry-run reports changes without writing files or downloading images', function () {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'youtube-embed-dry-run-'));
  const markdownPath = path.join(root, 'article.md');
  const original = '<iframe src="https://www.youtube.com/embed/3HiLLByBWkg" title="Video showing debugging."></iframe>\n';
  let downloadCalled = false;

  fs.writeFileSync(markdownPath, original);

  return runMigration({
    getBuffer: function () {
      downloadCalled = true;
      return Promise.resolve({ contentType: 'image/jpeg', data: JPEG });
    },
    inputs: [markdownPath],
    logger: function () {},
    root
  }).then(function (summary) {
    assert.equal(summary.embedCount, 1);
    assert.equal(downloadCalled, false);
    assert.equal(fs.readFileSync(markdownPath, 'utf8'), original);
    assert.equal(fs.existsSync(path.join(root, 'images', 'article', 'youtube-3HiLLByBWkg.jpg')), false);
  }).finally(function () {
    fs.rmSync(root, { recursive: true, force: true });
  });
});

test('directory input recursively scans only Markdown files', function () {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'youtube-embed-directory-'));
  const nestedDirectory = path.join(root, 'nested');
  const markdownPath = path.join(nestedDirectory, 'article.md');

  fs.mkdirSync(nestedDirectory);
  fs.writeFileSync(path.join(root, 'package.json'), '{}');
  fs.writeFileSync(markdownPath, '<iframe src="https://www.youtube.com/embed/3HiLLByBWkg" title="Video showing debugging."></iframe>\n');

  return runMigration({
    inputs: [root],
    logger: function () {},
    root
  }).then(function (summary) {
    assert.equal(summary.fileCount, 1);
    assert.equal(summary.embedCount, 1);
  }).finally(function () {
    fs.rmSync(root, { recursive: true, force: true });
  });
});

test('failed downloads leave Markdown unchanged', function () {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'youtube-embed-failure-'));
  const markdownPath = path.join(root, 'article.md');
  const original = '<iframe src="https://www.youtube.com/embed/3HiLLByBWkg" title="Video showing debugging."></iframe>\n';

  fs.writeFileSync(markdownPath, original);

  return assert.rejects(runMigration({
    getBuffer: function () {
      return Promise.reject(new Error('network unavailable'));
    },
    inputs: [markdownPath],
    logger: function () {},
    root,
    write: true
  }), /Unable to download a JPEG thumbnail/).then(function () {
    assert.equal(fs.readFileSync(markdownPath, 'utf8'), original);
    assert.equal(fs.existsSync(path.join(root, 'images', 'article', 'youtube-3HiLLByBWkg.jpg')), false);
  }).finally(function () {
    fs.rmSync(root, { recursive: true, force: true });
  });
});

test('analyzes only YouTube iframes', function () {
  const markdownPath = path.join('docs', 'article.md');
  const content = [
    '<iframe src="https://example.com/embed/3HiLLByBWkg" title="Example"></iframe>',
    '<iframe src="https://www.youtube.com/embed/3HiLLByBWkg" title="Video showing debugging."></iframe>'
  ].join('\n');
  const analysis = analyzeMarkdown(markdownPath, content);

  assert.equal(analysis.embeds.length, 1);
  assert.match(analysis.content, /https:\/\/example\.com/);
  assert.doesNotMatch(analysis.content, /youtube\.com\/embed/);
});
