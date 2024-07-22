import express, { NextFunction, Request, Response } from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";

type Error = {
  type: string;
};

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", protect, router);
app.post("/users", createUser);
app.post("/signin", signIn);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.type === "ValidationError") {
    res.status(401).json({ message: "Bad Request" });
  } else if (err.type === "AuthorizationError") {
    res.status(403).json({ message: "Unauthorized" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }

  return undefined;
});

export default app;
