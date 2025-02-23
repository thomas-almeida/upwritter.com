import express from "express";
import {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogPostController.js";

const router = express.Router();

router.post("/", createBlogPost);
router.get("/", getBlogPosts);
router.get("/:id", getBlogPostById);
router.put("/:id", updateBlogPost);
router.delete("/:id", deleteBlogPost);

export default router;
