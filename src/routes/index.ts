import { Router } from "express";
import CategoryRoutes from "./category.routes.js";

const router = Router();

router.use('/categories', CategoryRoutes);

export default router;
