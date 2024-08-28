/* eslint-disable camelcase */

import body_parser from "body-parser";
import cors from "cors";
import express from "express";
import * as os from "os";

const app = express();
const port = process.env.PORT || 8080;

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

if (os.platform() === "linux") {
  app.use(
    cors({
      origin: "https://tasks.blem.dev",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    }),
  );
} else {
  app.use(
    cors({
      origin: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    }),
  );
}

app.use(express.static("../../client/dist/"));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
