import express from "express";
import cors from "cors";
import http from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dbPromise from "./database.js";
import { Server } from "socket.io";

// Setup __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Update this to match your client URL in production
        methods: ['GET', 'POST'],
    },
});

// Middleware for JSON body parsing
app.use(express.json());
app.use(cors());

// Serve static files from React's build directory
app.use(express.static(join(__dirname, "build")));

app.post("/v1/session/create", async (req, res) => {
  console.log({ endpoint: "/v1/session/create" });
  const sessionId = Math.random().toString(36).substr(2, 4); // Generate 4-character session ID
  const db = await dbPromise;
  await db.run("INSERT INTO sessions (session_id, grid) VALUES (?, ?)", [
    sessionId,
    "{}",
  ]);
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

// Catch-all handler for React app
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});

let activeCells = new Set();

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the current active cells to the newly connected client
  socket.emit("initialize", Array.from(activeCells)); // Convert Set to Array for serialization

  // Handle cell activation from clients
  socket.on("cellActivated", ({ x, y, sessionId }) => {
    console.log({ x, y });
    const cellKey = `${x},${y}`;
    activeCells.add(cellKey);

    // Broadcast the updated cell to all connected clients
    socket.broadcast.emit(`${sessionId}/${x}-${y}`, { x, y });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`LiteBrightPro API is running on http://localhost:${PORT}/api`);
});
