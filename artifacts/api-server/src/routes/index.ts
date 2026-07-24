import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import blogRouter from "./blog.js";
import mediaRouter from "./media.js";
import textsRouter from "./texts.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogRouter);
router.use(mediaRouter);
router.use(textsRouter);

export default router;
