const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Khởi tạo ứng dụng Express và HTTP server
const app = express();
const server = http.createServer(app);

// Tạo Socket.io server
const io = socketIo(server, {
  cors: {
    origin: "*", // Cho phép tất cả các origin kết nối
  },
});

// Kết nối tới client
io.on("connection", (socket) => {
  // Lắng nghe sự kiện từ client
  socket.on("sync_data", (data) => {
    // Gửi lại dữ liệu cho tất cả client
    io.emit("sync_data", data);
  });
});

// Chạy server trên cổng 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
