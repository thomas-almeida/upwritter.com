import express from "express";
import {
  createRepository,
  getRepositories,
  getRepositoryById,
  updateRepository,
  deleteRepository,
  addPostToRepository
} from "../controllers/repositoryController.js";

const router = express.Router();

router.post("/", createRepository);
router.get("/", getRepositories);
router.get("/:id", getRepositoryById);
router.put("/:id", updateRepository);
router.delete("/:id", deleteRepository);
router.post("/add-post", addPostToRepository)
export default router;
