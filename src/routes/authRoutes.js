import express from "express";
import authController from "../interface/controllers/authController.js";

const router = express.Router();

router.post("/", authController.loginWithGoogle);

export default router;
