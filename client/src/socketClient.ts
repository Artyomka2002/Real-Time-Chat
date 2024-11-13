import { io, Socket } from "socket.io-client";
export const socket: Socket = io("http://localhost:5000");

// export const userSoket = {
//   emit: socket.emit("getUsers"),
//   on: (callback: any) => socket.on("getUsers", callback),
//   off: (callback: any) => socket.off("getUsers", callback),
// };

// I wanted to take out the methods separately,
//  but I didn't do it. Due to the features of the library
