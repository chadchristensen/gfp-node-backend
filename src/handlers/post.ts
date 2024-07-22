import { RequestHandler } from "express";
import prisma from "../db";

export const getAllPosts: RequestHandler = async (req, res, next) => {
  // TODO: Add pagination and filtering
  try {
    const posts = await prisma.post.findMany();
    res.json({ data: posts });
  } catch (error) {
    next(error);
  }
};

export const getPostById: RequestHandler = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ data: post });
  } catch (error) {
    next(error);
  }
};

// TODO: Fix authentication to only allow admin or authors to create posts
export const createPost: RequestHandler = async (req, res, next) => {
  try {
    const newPost = await prisma.post.create({
      data: { ...req.body, authorId: req.user.id },
    });

    res.status(201).json({ data: newPost });
  } catch (error) {
    next(error);
  }
};

// TODO: Fix authentication to only allow admin to update, or only authors can update their own posts
export const updatePost: RequestHandler = async (req, res, next) => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: req.params.postId },
      data: req.body,
    });

    res.json({ data: updatedPost });
  } catch (error) {
    next(error);
  }
};

// TODO: Fix authentication to only allow admin to delete, or only authors can delete their own posts
export const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: req.params.postId },
    });

    res.status(204).json({ data: deletedPost });
  } catch (error) {
    next(error);
  }
};
