import User from "../models/User.js";
import {
  renderSuccessPage,
  renderErrorPage,
  successfullApiResponse,
} from "../utils/helper.js";
import { signToken, verifyToken } from "../middlewares/ExternalOperation.js";
const authController = {};

authController.renderSignUpForm = (req, res) => {
  console.log("opening register form");

  // Render the sign-up form view
  return renderSuccessPage(res, "", "signup", {}, 200);
};

authController.renderSignInForm = (req, res) => {
  console.log("opening login form");
  // Render the sign-up form view
  return renderSuccessPage(res, "", "signin", {}, 200);
};

authController.signUp = async (req, res) => {
  try {
    console.log("IN REGISTER API....");
    const { username, email, password } = req.body;
    // Check if email already exists in the database
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return renderErrorPage(res, "Email already exists", "signup", {}, 400);
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    console.log("existingUser...", newUser);
    const getSignToken = await signToken({
      id: newUser._id,
      email: newUser.email,
    });
    console.log("token", getSignToken);
    const dataToSend = {
      id: newUser._id,
      name: username,
      email: newUser.email,
      token: getSignToken,
      token_validity: "2hr",
    };
    // return renderSuccessPage(res, "", "room", { user: dataToSend }, 201);/\
    return successfullApiResponse(
      res,
      dataToSend,
      "user has been created",
      201
    );
  } catch (error) {
    // Handle other errors
    console.error("Error signing up:", error);
    return renderErrorPage(res, "Internal Server Error", "signup", {}, 500);
  }
};

// Controller function for user sign-in
authController.signIn = async (req, res) => {
  console.log("in controller");
  const { email, password } = req.body;
  console.log("req.body", req.body);
  try {
    // Find the user by username
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      apiResponse.renderErrorPage(
        res,
        "Invalid credentials",
        "signin",
        {},
        400
      );
      return null;
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      apiResponse.error(res, "login not match", 400);
    }

    const getSignToken = await signToken({
      id: user._id,
      email: user.email,
    });

    const dataToSend = {
      id: user._id,
      name: user.username,
      email: user.email,
      token: getSignToken,
      token_validity: "2hr",
    };
    // Send a success response
    apiResponse.success(res, dataToSend, "login match");
  } catch (error) {
    console.error("Error signing in:", error);
    apiResponse.renderErrorPage(res, "Internal server error", "signin");
  }
};

export default authController;
