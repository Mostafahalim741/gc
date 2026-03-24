import { Router, type IRouter } from "express";
import healthRouter from "./health";
import goldRouter from "./gold";
import visitorsRouter from "./visitors";
import aiAdviceRouter from "./ai-advice";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/gold", goldRouter);
router.use(visitorsRouter);
router.use(aiAdviceRouter);

export default router;
