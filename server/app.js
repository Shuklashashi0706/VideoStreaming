import express from "express";
import fs, { readFileSync, createReadStream, statSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
console.log(__dirname);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/video", (req, res) => {
  const filePath = `${__dirname}/public/video.mp4`;
  const range = req.headers.range;
  const stat = statSync(filePath);
  const fileSize = stat.size;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const chunkSize = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, fileSize - 1);
  const contentLength = end - start + 1;
  const fileStream = createReadStream(filePath, { start, end });
  fileStream.pipe(res);
  const header = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, header);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
