import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await prisma.role.create({
      data: { name }
    });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
