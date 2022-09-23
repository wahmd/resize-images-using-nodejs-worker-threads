const express = require("express");
const app = express();
const { Worker } = require("worker_threads");

app.get("/uploadImage", async (req, res) => {
  //   const img = await fs.readFile(__dirname + "/mytestimg.jpg", "binary");
  //   const updatedBuff = await sharp("mytestimg.jpg").rotate().resize(1280, 720);

  console.log("running worker thread... ");
  try {
    const workerPromise = await new Promise((resolve, reject) => {
      const worker = new Worker(__dirname + "/worker.js", {
        workerData: {
          company: "facebook",
          category: "cover",
          fileName: "mytestingimg.jpg",
        },
        // default behaviour in node 15+
        execArgv: [...process.execArgv, "--unhandled-rejections=strict"],
      });

      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });

    console.log("worker thread completed. ", workerPromise);

    res.status(200).json({
      status: "done",
    });
  } catch (error) {
    console.log("errro:", error);
    res.status(500).json({ error });
  }
});

app.get("/", (_, res) =>
  res.status(200).json({
    msg: "try on route /uploadImage",
  })
);

app.listen(3000, () =>
  console.log("\nRestarting server... \nListening on PORT: ", 3000)
);
