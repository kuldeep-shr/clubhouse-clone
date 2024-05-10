import { server } from "../app.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

import {
  successfullApiResponse,
  errorApiResponse,
  renderErrorPage,
  renderSuccessPage,
} from "../utils/helper.js";
const roomController = {};

// Controller function to create a new room
roomController.createRoom = async (req, res) => {
  try {
    // Extract room data from the request body
    const { roomName, host, speakers, roomReferenceId } = req.body;
    console.log("roomReferenceId", roomReferenceId);

    // Create a new room instance
    const newRoom = new Room({
      roomName: roomName,
      host: host,
      speakers: speakers,
      roomReferenceId: roomReferenceId,
      isActive: true,
    });

    // Save the new room to the database
    await newRoom.save();

    const dataToSend = [
      {
        roomName: roomName,
        roomId: roomReferenceId,
      },
    ];
    return successfullApiResponse(
      res,
      dataToSend,
      "Room created successfully",
      201
    );
  } catch (error) {
    console.error("Error creating room:", error);
    return errorApiResponse(res, "Internal server error", 500);
  }
};

roomController.meeting = async (req, res) => {
  try {
    const isRoomExists = await Room.findOne({
      roomReferenceId: req.query.data,
    });
    if (!isRoomExists) {
      return renderErrorPage(
        res,
        "either room is not exist or has been closed",
        "roomInfo",
        {},
        400
      );
    }
    console.log("isRoomExists", isRoomExists);
    return renderSuccessPage(
      res,
      "",
      "roomReal",
      { roomName: isRoomExists.roomReferenceId },
      200
    );
  } catch (error) {
    console.log("z-error", error);
  }
};

roomController.joinMeeting = async (req, res) => {
  try {
    console.log("I am req.body");
    const { roomReferenceId } = req.body;

    const isRoomExists = await Room.findOne({
      roomReferenceId: roomReferenceId,
    });
    if (!isRoomExists) {
      return renderErrorPage(
        res,
        "either room is not exist or has been closed",
        "roomInfo",
        {},
        400
      );
    }
    return successfullApiResponse(
      res,
      [{ redirectTo: "/meeting", data: roomReferenceId }],
      "success",
      200
    );
  } catch (error) {
    console.log("error", error);
  }
};

// Controller function to get all rooms
roomController.getAllRooms = async (req, res) => {
  try {
    // Fetch all rooms from the database
    const rooms = await Room.find();

    // Return the list of rooms
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    // Handle errors
    console.error("Error fetching rooms:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default roomController;
