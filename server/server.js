const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const Telemetry = require("./models/Telemetry");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// ✅ Create HTTP server for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST"],
  },
});

// 🔥 Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/batteryDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// ✅ Socket.IO Connection Event
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// 🔥 Generate & Emit Fake Telemetry Every 5 Seconds
setInterval(async () => {
  const batteries = ["batteryA", "batteryB"];

  for (const batteryId of batteries) {
    const newData = new Telemetry({
      batteryId,
      soc: +(70 + Math.random() * 20).toFixed(2),
      soh: 95,
      battery_voltage: +(48 + Math.random()).toFixed(2),
      current: +(5 + Math.random() * 5).toFixed(2),
      battery_temp: +(30 + Math.random() * 10).toFixed(2),
      charge_cycle: Math.floor(Math.random() * 200),
    });

    await newData.save();

    // Fetch latest 50 records for this battery
    const latestData = await Telemetry.find({ batteryId })
      .sort({ time: 1 })
      .limit(50);

    // 🔥 Emit to frontend
    io.emit(`batteryUpdate-${batteryId}`, latestData);
  }

  console.log("Live telemetry pushed");
}, 5000);

// 🔥 REST API (optional)
app.get("/api/battery/:batteryId", async (req, res) => {
  try {
    const { batteryId } = req.params;
    const data = await Telemetry.find({ batteryId })
      .sort({ time: 1 })
      .limit(50);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Start server
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT} with WebSocket`)
);