import { RequestHandler } from "express";
import prisma from "../db";

export const getAllCategories: RequestHandler = async (req, res) => {
  // TODO: Add pagination and filtering
  try {
    const categories = await prisma.category.findMany();
    res.json({ data: categories });
  } catch (error) {
    console.error(error);
  }
};

export const getCategoryById: RequestHandler = async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ data: category });
  } catch (error) {
    console.error(error);
  }
};

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const newCategory = await prisma.category.create({
      data: req.body,
    });

    res.status(201).json({ data: newCategory });
  } catch (error) {
    console.error(error);
  }
};

export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: req.params.categoryId },
      data: req.body,
    });

    res.json({ data: updatedCategory });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id: req.params.categoryId },
    });

    res.status(204).json({ data: deletedCategory });
  } catch (error) {
    console.error(error);
  }
};
