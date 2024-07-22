import { NextFunction, RequestHandler, Request, Response } from "express";
import prisma from "../db";
import { User } from "./user";

type createPostPayload = {
  title: string;
  slug: string;
  description: string;
  image_src: string;
  image_alt_text: string;
  publish_date: Date;
  cta_link: string;
  cta_text: string;
  categoryId: string;
  is_affiliate_link: boolean;
  authorId: string;
};

// TODO: Add pagination and filtering
export const getAllPosts: RequestHandler = async (req, res, next) => {
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
export const createPost = async (
  req: Request & { body: createPostPayload; user?: User },
  res: Response,
  next: NextFunction,
) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const newPost = await prisma.post.create({
      data: { ...req.body, authorId: user.id },
    });

    res.status(201);
    res.json({ data: newPost });
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
