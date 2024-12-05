import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express  ------------------------------------------------------------
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update this to match your client URL in production
    methods: ["GET", "POST"],
  },
});

// Middlewares -------------------------------------------------------------
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.post("/v1/session/create", async (req, res) => {
  console.log({ endpoint: "/v1/session/create" });
  const sessionId = Math.random().toString(36).substr(2, 4); // Generate 4-character session ID
  res.json({ sessionId });
});

// Define your API endpoints
app.get("/v1/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.post("/v1/cell", (req, res) => {
  const data = req.body;
  res.json({ received: true, data });
  print(data);
});

let activeCells = new Set();

io.on("connection", (socket) => {
  // Send the current active cells to the newly connected client
  socket.emit("initialize", Array.from(activeCells)); // Convert Set to Array for serialization

  // Handle cell activation from clients
  socket.on("cellActivated", ({ x, y, sessionId }) => {
    console.log({ sessionId, x, y });
    const cellKey = `${x},${y}`;
    activeCells.add(cellKey);

    // Broadcast the updated cell to all connected clients
    socket.broadcast.emit(`${sessionId}/${x}-${y}`, { x, y });
  });

  socket.on("clear", () => {
    socket.broadcast.emit("clear-board", true);
  });

  socket.on("palette", ({ palette }) => {
    socket.broadcast.emit("palette", palette);
  });

  socket.on("user-conection", ({ userId, sessionId }) => {
    console.log({ connected: true, userId, sessionId });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`LiteBrightPro API is running on http://localhost:${PORT}/api`);
});
