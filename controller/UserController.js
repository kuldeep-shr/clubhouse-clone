import {
  renderSuccessPage,
  renderErrorPage,
  successfullApiResponse,
} from "../utils/helper.js";
import Notification from "../models/Notification.js";
// import admin from "firebase-admin";
// const serviceAccount =
//   "../clubhouse-clone-a2eb5-firebase-adminsdk-qfy3t-f1b824d8b4.json";
const userController = {};

userController.renderRoom = async (req, res) => {
  try {
    return renderSuccessPage(res, "", "roomInfo", {}, 200);
  } catch (error) {
    return renderErrorPage(res, "Internal server error", "roomInfo", {}, 400);
  }
  // Render the sign-up form view
};
userController.renderHallRoom = async (req, res) => {
  try {
    return renderSuccessPage(res, "", "dashboard", {}, 200);
  } catch (error) {
    return renderErrorPage(res, "Internal server error", "dashboard", {}, 400);
  }
};

userController.renderMainRoom = async (req, res) => {
  try {
    return renderSuccessPage(res, "", "main", {}, 200);
  } catch (error) {
    return renderErrorPage(res, "Internal server error", "main", {}, 400);
  }
};

userController.saveNotifications = async (req, res) => {
  try {
    const { title, message } = req.body;
    const newNotification = new Notification({ title, message });
    await newNotification.save();
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

userController.listOfUsers = async (req, res) => {
  try {
    console.log("in start room... api");
    const users = [
      {
        id: "663b0bfaa9478a3b17fe635a",
        name: "Kuldeep",
      },
      {
        id: "663b0c17d00bd7c14123f876",
        name: "Suraj",
      },
      {
        id: "663b0c1fef528f5506dd43a0",
        name: "Shubham",
      },
      {
        id: "663b0c27a1679c81d5b71354",
        name: "Ritam",
      },
    ];
    return successfullApiResponse(res, users, "user data");
  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default userController;
