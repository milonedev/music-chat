import { Router } from "express";
import { authCallbackController } from "../controller/auth.controller.js";

const router = Router()

router.post("/callback", authCallbackController);

export default router;