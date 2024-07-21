import { RequestHandler } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";

// TODO: Update the User type to match your actual user schema.
type User = {
  id: string;
  email: string;
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as Secret,
    { expiresIn: "7d" },
  );

  return token;
};

export const protect: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token. Please log in again. Error: ", error.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, 10);
};
