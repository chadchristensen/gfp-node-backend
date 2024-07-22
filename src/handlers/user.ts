import { RequestHandler } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "src/modules/auth";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
      },
    });
    const token = await createJWT(user);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error creating user: ", error);
    next(error);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePasswords(
      req.body.password,
      user.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = await createJWT(user);
    res.json({ token });
  } catch (error) {
    console.error("Error signing in: ", error);
    next(error);
  }
};
