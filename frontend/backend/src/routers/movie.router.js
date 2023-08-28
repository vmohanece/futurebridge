import express from "express";
import movieController from "../controllers/movie.controller.js";
const router = express.Router();

router.post("/store", movieController.storeMovie);

export default router;