import crypto from "crypto";
import Room from "../models/Room.js";
import { successfullApiResponse, errorApiResponse } from "../utils/helper.js";
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
    // Handle errors
    console.error("Error creating room:", error);
    return errorApiResponse(res, "Internal server error", 500);
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
