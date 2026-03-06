const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const adminRoutes = require("./routes/adminRoutes");
const attackRoutes = require("./routes/attackRoutes");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);
app.use("/admin", adminRoutes);
app.use("/vuln", attackRoutes);

io.on("connection", (socket) => {
  console.log("Dashboard connected");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
