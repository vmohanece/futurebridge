import express from "express";
import userController from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", userController.getUserList);
router.post("/store", userController.storeUser);
router.put("/", userController.updateUser);
router.delete("/", userController.removeUser);

export default router;