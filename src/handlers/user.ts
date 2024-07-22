import { RequestHandler } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "src/modules/auth";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string | null;
};

export const createUser: RequestHandler = async (req, res, next) => {
  const { email, password, name }: User = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
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
  const { email, password }: User = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePasswords(password, user.password);

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
