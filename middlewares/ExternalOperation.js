import jwt from "jsonwebtoken";
import { renderErrorPage } from "../utils/helper.js";
import Room from "../models/Room.js";

const signToken = (payload, expiresIn = "2hr") => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
};

const verifyToken = (req, res, next) => {
  console.log("TOKEN CHECKING>>>>>>>>", req.query);
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : req.query.token;
  if (!token) {
    return renderErrorPage(res, "No token provided", "signup", 400);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error);
    return renderErrorPage(
      res,
      "Invalid token or session expired",
      "signin",
      400
    );
  }
};

export { signToken, verifyToken };
