import http from "http";
import express, { Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import { MessagesChat } from "../client/src/types";
import { UserType } from "../client/src/types";
import { GET_USERS } from "../const";
import { MESSAGE } from "../const";
import { UniquenessofTheChat } from "../const";
import { ID_CHAT } from "../const";
import { NEW_USER } from "../const";

const app = express();
const PORT = 5000;
const chats: MessagesChat[] = [];
let users: UserType[] = [];

const httpServer = http.createServer(app);
const socketIO = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

const activeChats: { [key: string]: MessagesChat } = {};

socketIO.on("connection", (socket) => {
  socket.on(NEW_USER, (data) => {
    users.push(data);
    socketIO.emit(GET_USERS, users);
  });

  // Receiving a message from a client and creating a chat based on these messages
  socket.on(MESSAGE, (data) => {
    const chatId = data.socketID;

    if (!data.text) return;

    let chat = activeChats[chatId];

    let message = {
      name: data.name,
      messageName: data.text,
      id: `${MESSAGE}-${data.name}-${data.id}`,
    };

    if (!chat) {
      chat = {
        socketID: chatId,
        name: data.name,
        text: [],
      };
      activeChats[chatId] = chat;
      chats.push(chat);
    }

    chat.text.push(message);
    socketIO.emit(`response_${chatId}`, chat.text);
  });

  // Getting a chat instance from a client between two users
  socket.on(UniquenessofTheChat, (data) => {
    const identifier: string = data;
    socketIO.emit(ID_CHAT, identifier);
  });

  socket.on(GET_USERS, () => {
    socketIO.emit(GET_USERS, users);
  });
  // Removing the current user from the list
  socket.on("disconnect_user", (userId) => {
    const result = users.filter((user) => user.name !== userId);
    users = result;
    socketIO.emit(GET_USERS, users);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
