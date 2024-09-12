exports.threadSocket = (io, socket) => {

  socket.on('join-thread', async (data) => {
    socket.join(data.threadId)
    console.log("joined")
  });

  socket.on('leave-thread', async (data) => {
    socket.leave(data.threadId)
  });

}
