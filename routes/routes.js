// Create a file named authRoutes.js in your routes directory
import express from "express";
const router = express.Router();

import { verifyToken } from "../middlewares/ExternalOperation.js";
import authController from "../controller/AuthController.js";
import userController from "../controller/UserController.js";
import roomController from "../controller/RoomController.js";

router.get("/signup", authController.renderSignUpForm);
router.get("/signin", authController.renderSignInForm);
router.get("/room", userController.renderRoom);
router.get("/dashboard", userController.renderHallRoom);
router.get("/meeting", roomController.meeting);
router.get("/users", userController.listOfUsers);

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post(
  "/save-notifications",
  verifyToken,
  userController.saveNotifications
);
router.post("/create-room", verifyToken, roomController.createRoom);
router.post("/meeting", verifyToken, roomController.joinMeeting);

export default router;
