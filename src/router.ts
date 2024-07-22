import { Router } from "express";
import { handleInputErrors } from "./modules/middleware";
import {
  categoryValidationRules,
  postValidationRules,
} from "./modules/validators";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "./handlers/post";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "./handlers/category";

const router = Router();

router.get("/posts", getAllPosts);

router.get("/posts/:postId", getPostById);

router.post("/posts", postValidationRules, handleInputErrors, createPost);

router.put(
  "/posts/:postId",
  postValidationRules,
  handleInputErrors,
  updatePost,
);

router.delete("/posts/:postId", deletePost);

router.get("/categories", getAllCategories);

router.get("/categories/:categoryId", getCategoryById);

router.post(
  "/categories",
  categoryValidationRules,
  handleInputErrors,
  createCategory,
);

router.put(
  "/categories/:categoryId",
  categoryValidationRules,
  handleInputErrors,
  updateCategory,
);

router.delete("/categories/:categoryId", deleteCategory);

export default router;
