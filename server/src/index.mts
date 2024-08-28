/* eslint-disable camelcase */

import body_parser from "body-parser";
import cors from "cors";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import * as os from "os";

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

const users_json_path = path.join(process.cwd(), "/temp/users.json");

if (!fs.existsSync(users_json_path)) {
  const users: User[] = [
    {
      username: "alice_smith",
      first_name: "Alice",
      last_name: "Smith",
      email: "alice01@example.com",
    },
    {
      username: "bob_johnson",
      first_name: "Bob",
      last_name: "Johnson",
      email: "bob01@example.com",
    },
  ];
  fs.writeFileSync(users_json_path, JSON.stringify(users));
}

const users = JSON.parse(fs.readFileSync(users_json_path, "utf-8")) as User[];

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

app.get("/api/users", (_: express.Request, response: express.Response) => {
  return response.status(200).send({ success: true, users });
});

app.post(
  "/api/users",
  (request: express.Request, response: express.Response) => {
    const user = request.body as User;
    users.push(user);
    fs.writeFileSync(users_json_path, JSON.stringify(users));
    return response.status(200).send({ success: true, user });
  },
);
