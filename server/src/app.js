import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import blogPostRoutes from "./routes/blogPostRoutes.js";
import repositoryRoutes from "./routes/repositoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Definir rotas
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/blog-posts", blogPostRoutes);
app.use("/repositories", repositoryRoutes);

export default app;
