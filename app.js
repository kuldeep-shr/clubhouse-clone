// Import modules
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { WebSocketServer } from "ws";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import allRoutes from "./routes/routes.js";
// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app and HTTP server
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
wss.on("connection", function connection(ws) {
  console.log("A new client connected");

  ws.on("message", function incoming(message) {
    console.log("Received: %s", message);

    // Echo the received message back to the client
    // ws.send(`Echo: ${message}`);
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});

export { server };
