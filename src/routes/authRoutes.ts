import { Router } from "express";
import { loginUser, signUp } from "../web/userController";

const router = Router();

router.post("/register", signUp);
router.post("/login", loginUser);

export default router;
