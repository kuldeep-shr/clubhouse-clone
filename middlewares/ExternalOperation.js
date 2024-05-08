import jwt from "jsonwebtoken";
import { errorApiResponse } from "../utils/helper.js";

const signToken = (payload, expiresIn = "2hr") => {
  console.log("payload.....", payload);
  console.log("process.env.SECRET_KEY.....", process.env.SECRET_KEY);
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(
    "IN verify token",
    token,
    "process.env",
    process.env.SECRET_KEY,
    "token.split",
    token.split(" ")[1]
  );
  if (!token) {
    return errorApiResponse(res, "No token provided", 400);
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error);
    return errorApiResponse(res, "Invalid token", 400);
  }
};

export { signToken, verifyToken };
