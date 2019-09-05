const express = require("express");
const bodyParser = require("body-parser");
const Formatter = require("mush-format");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  const formatter = new Formatter();
  res.status(200);
  res.json({
    error: false,
    success: true,
    version: formatter.version(),
    message: "Welcome to Mush Formatter"
  });
});

app.post("/", async (req, res, next) => {
  const formatter = new Formatter();
  const data = await formatter.format(req.body.text);
  if (data) {
    res.status(200);
    res.json({
      error: false,
      success: true,
      message: "Format complete.",
      data
    });
  } else {
    res.status(500);
    res.json({
      error: true,
      success: false,
      message: "Server error. Formatter didn't run"
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
