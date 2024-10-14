const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:3001" });

let onlineUsers = []

io.on("connection", (socket) => {
  console.log(socket.id)
  // new user onlined
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some(item => item.userId === userId) &&
      onlineUsers.push({
        userId,
        socket: socket.id
      })
    onlineUsers = onlineUsers.filter(item => item.userId !== "")
    io.emit("getOnlineUsers", onlineUsers)
  })
  ////////////////

  // new message
  socket.on("sendMessage", data => {
    const find = onlineUsers.find(user => user.socket === data.socketId)
    if (find){ 
      io.to(find.socket).emit("getMessage", data.message)
    }
  })
  /////////////////
  // new message
  socket.on("userInfo", data => {
    const find = onlineUsers.find(user => user.socket === data.socketId)
    if (find){ 
      io.to(find.socket).emit("sendContact", data.userInfo)
    }
  })
  /////////////////
  // user offlined
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(user => user.socket !== socket.id)
    io.emit("getOnlineUsers", onlineUsers)
  })
});

io.listen(5173);