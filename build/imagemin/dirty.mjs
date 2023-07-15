// @ts-check
import imagemin from "imagemin";
import { promises as fs } from "fs";

import gifsicle from "imagemin-gifsicle";
import pngquant from "imagemin-pngquant";
import mozjpeg from "imagemin-mozjpeg";
import { getAlreadyMinified, getDirtyImages, saveAlreadyMinified } from "./lib.mjs";

const files =
  process.argv.length > 2 ? process.argv.slice(2) : getDirtyImages();

(async () => {
  const alreadyMinified = await getAlreadyMinified();
  for (const [i, file] of files.entries()) {
    if (alreadyMinified.has(file)) {
      console.log("Skipping", file, ", in already-minified.json");
      files.splice(i, 1);
    }
  }

  const minified = await imagemin(files, {
    plugins: [
      gifsicle(),
      pngquant({ quality: [0.6, 0.8] }),
      mozjpeg({ quality: 80 }),
    ],
  });

  for (const file of minified) {
    const prev = await fs.stat(file.sourcePath);
    alreadyMinified.add(file.sourcePath);
    console.log(
      `${file.sourcePath} => ${prev.size} to ${file.data.length} (${(
        (file.data.length / prev.size) *
        100
      ).toFixed(2)}%)`
    );
    await fs.writeFile(file.sourcePath, file.data);
  }

  await saveAlreadyMinified(alreadyMinified);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
