import mongoose from "mongoose";

// Define the Room schema
const roomSchema = new mongoose.Schema({
  // Name of the room
  roomName: {
    type: String,
    required: true,
  },

  // Host of the room (reference to User model)
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // List of speakers in the room (references to User model)
  speakers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // Indicates whether the room is active or not
  isActive: {
    type: Boolean,
    default: false,
  },

  // Unique identifier for the room
  roomReferenceId: {
    type: String,
    required: true,
    unique: true,
  },

  // Timestamp of when the room was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Room model using the schema
const Room = mongoose.model("Room", roomSchema);

export default Room;
