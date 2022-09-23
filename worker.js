console.log("worker running...");
const { parentPort, workerData } = require("node:worker_threads");
const sharp = require("sharp");
const fs = require("fs").promises;

const { DIMENSION } = require("./constants");

// resize image
async function resizeImage() {
  console.log("resizeImage running...");

  // get data from worker thread
  const { company, category, fileName } = workerData;

  const [width, height] = DIMENSION[company][category];

  if (!width || !height) {
    console.log("Failed to destructure width and heigth");
    return;
  }

  let updatedBuff;
  updatedBuff = await sharp("mytestimg.jpg")
    .rotate()
    .resize(20000, 20000)
    .jpeg({ mozjpeg: true })
    .toBuffer();

  await fs.writeFile(`${company}-${category}.jpg`, updatedBuff);

  parentPort.postMessage({ msg: "resized imaged wrote" });
}

resizeImage();
