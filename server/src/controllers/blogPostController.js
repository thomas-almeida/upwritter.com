import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBlogPost = async (req, res) => {
  try {
    const { name, url, content, ownerId, status } = req.body;
    const blogPost = await prisma.blogPost.create({
      data: {
        name,
        url,
        content,
        owner: { connect: { id: ownerId } },
        status,
      },
      include: { owner: true },
    });
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await prisma.blogPost.findMany({ include: { owner: true } });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await prisma.blogPost.findUnique({ where: { id }, include: { owner: true } });
    if (!blogPost) return res.status(404).json({ error: "Post não encontrado" });
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url, content, status } = req.body;
    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: { name, url, content, status },
    });
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blogPost.delete({ where: { id } });
    res.json({ message: "Post deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
