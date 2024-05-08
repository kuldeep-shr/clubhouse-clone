// Create a file named authRoutes.js in your routes directory
import express from "express";
const router = express.Router();

import { verifyToken } from "../middlewares/ExternalOperation.js";
import authController from "../controller/AuthController.js";
import userController from "../controller/UserController.js";
import roomController from "../controller/RoomController.js";

//renders
router.get("/signup", authController.renderSignUpForm);
router.get("/signin", authController.renderSignInForm);
router.get("/meeting", userController.renderMeetingRoom); //tmp
router.get("/room", userController.renderRoom); //tmp
router.get("/hallroom", userController.renderHallRoom); //tmp
router.get("/main", userController.renderMainRoom); //tmp

//api for signup
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/users", verifyToken, userController.listOfUsers);
router.post("/create-room", verifyToken, roomController.createRoom);

//route for invitation link creation
//route for accept the link invitation and validates

export default router;
