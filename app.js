// Import modules
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Notification from "./models/Notification.js";
import allRoutes from "./routes/routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app and HTTP server
import { WebSocketServer } from "ws";
const app = express();
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocketServer({ server: server });

//database connectivity
mongoose
  .connect("mongodb://localhost:27017/clubhouse-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Pug as the view engine
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

app.use(express.static(join(dirname(__dirname), "public")));

app.use("/", allRoutes);

// Handle WebSocket connections

wss.on("connection", (ws) => {
  console.log("A new client connected");
  Notification.find().then((notifications) => {
    ws.send(JSON.stringify(notifications));
  });
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("messam", data);
    switch (data.type) {
      case "join-room":
        console.log("join-room");
        const { roomId, userId, userName } = data.data;
        console.log("roomId", roomId, "userId", userId, "userName", userName);
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "user-connected",
                data: { userId, userName },
              })
            );
          }
        });
        ws.roomId = roomId;
        break;
      case "send-message":
        console.log("send-message");
        const { inputMsg, senderName } = data.data;
        wss.clients.forEach((client) => {
          if (
            client.roomId === ws.roomId &&
            client.readyState === WebSocket.OPEN
          ) {
            client.send(
              JSON.stringify({
                type: "receive-message",
                data: { inputMsg, senderName },
              })
            );
          }
        });
        break;
      case "disconnect":
        const { disconnectUserId, disconnectUserName } = data.data;
        wss.clients.forEach((client) => {
          if (
            client !== ws &&
            client.roomId === ws.roomId &&
            client.readyState === WebSocket.OPEN
          ) {
            client.send(
              JSON.stringify({
                type: "user-disconnected",
                data: {
                  userId: disconnectUserId,
                  userName: disconnectUserName,
                },
              })
            );
          }
        });
        break;
      default:
        break;
    }
  });
});

export { server };
