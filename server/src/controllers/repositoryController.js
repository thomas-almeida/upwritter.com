import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar um novo repositório
export const createRepository = async (req, res) => {
  try {
    const { name, url, bitbucketUrl } = req.body;
    const repository = await prisma.repository.create({
      data: {
        name,
        url,
        bitbucketUrl, // Corrigindo o nome da propriedade para seguir o camelCase correto
      },
    });
    res.status(201).json(repository);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter todos os repositórios
export const getRepositories = async (req, res) => {
  try {
    const repositories = await prisma.repository.findMany({
      include: { posts: true },
    });
    res.json(repositories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um repositório por ID
export const getRepositoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const repository = await prisma.repository.findUnique({
      where: { id },
      include: { posts: true },
    });

    if (!repository) {
      return res.status(404).json({ error: "Repositório não encontrado" });
    }

    res.json(repository);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um repositório
export const updateRepository = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url, bitbucketUrl } = req.body;

    const repository = await prisma.repository.update({
      where: { id },
      data: { name, url, bitbucketUrl },
    });

    res.json(repository);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um repositório
export const deleteRepository = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.repository.delete({ where: { id } });
    res.json({ message: "Repositório deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Associar um BlogPost existente a um Repository
export const addPostToRepository = async (req, res) => {
  try {
    const { repositoryId, postId } = req.body;

    // Verificar se o repositório existe
    const repository = await prisma.repository.findUnique({ where: { id: repositoryId } });
    if (!repository) return res.status(404).json({ error: "Repositório não encontrado" });

    // Verificar se o BlogPost existe
    const blogPost = await prisma.blogPost.findUnique({ where: { id: postId } });
    if (!blogPost) return res.status(404).json({ error: "BlogPost não encontrado" });

    // Atualizar o BlogPost para associá-lo ao repositório
    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: { repoId: repositoryId },
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
