import { Server } from "socket.io";

export const socketHandler = (io: Server) => {
  const mainNamespace = io.of("/api");

  mainNamespace.on("connection", (socket) => {
    socket.emit("Hi");
  });
};
