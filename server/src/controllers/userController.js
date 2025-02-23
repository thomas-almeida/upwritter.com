import { PrismaClient } from "@prisma/client";
import maskPassword from "../utils/maskPassword.js";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { name, password, roleIds } = req.body;
    const maskedPassword = maskPassword.encrypt(password)
    const user = await prisma.user.create({
      data: {
        name,
        password: maskedPassword,
        role: { connect: roleIds.map(id => ({ id })) }
      },
      include: { role: true }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { role: true } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
