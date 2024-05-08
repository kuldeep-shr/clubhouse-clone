import {
  renderSuccessPage,
  renderErrorPage,
  successfullApiResponse,
} from "../utils/helper.js";
const userController = {};

userController.renderMeetingRoom = async (req, res) => {
  // Render the sign-up form view
  return renderSuccessPage(res, "", "meeting", {}, 200);
};
userController.renderRoom = async (req, res) => {
  // Render the sign-up form view
  return renderSuccessPage(res, "", "room", {}, 200);
};
userController.renderHallRoom = async (req, res) => {
  // Render the sign-up form view
  return renderSuccessPage(res, "", "hallroom", {}, 200);
};

userController.renderMainRoom = async (req, res) => {
  // Render the sign-up form view
  return renderSuccessPage(res, "", "main", {}, 200);
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
