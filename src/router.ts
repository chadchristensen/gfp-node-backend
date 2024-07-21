import { Router } from "express";

const router = Router();

router.get("/posts", (req, res) => {
  res.json({ message: "posts fetched" });
});

router.get("/posts/:postId", (req, res) => {
  res.json({ message: "post fetched" });
});

router.post("/posts", (req, res) => {
  // TODO: Create a new post
  res.json({ message: "post created" });
});

router.put("/posts/:postId", (req, res) => {
  res.json({ message: "post updated" });
});

router.delete("/posts/:postId", (req, res) => {
  res.json({ message: "post deleted" });
});

export default router;
