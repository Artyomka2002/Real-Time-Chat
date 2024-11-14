import { io, Socket } from "socket.io-client";
export const socket: Socket = io("http://localhost:5000");
import { GET_USERS, NEW_USER } from "./../../const";
import { UniquenessofTheChat } from "./../../const";
import { ID_CHAT } from "./../../const";
import { DescriptionActiveСhat, User } from "./types";
import { MESSAGE } from "./../../const";
import { DISCONNECT } from "./../../const";

export const userSocket = {
  emit: (event: string) => socket.emit(event),
  on: (callback: (data: User[]) => void) => socket.on(GET_USERS, callback),
  off: (callback: (data: User[]) => void) => socket.off(GET_USERS, callback),
};

export const currentChatSocket = {
  emit: (callback: object) => socket.emit(UniquenessofTheChat, callback),
};

export const ActiveChatSocket = {
  on: (callback: (data: DescriptionActiveСhat) => void) =>
    socket.on(ID_CHAT, callback),
  off: (callback: (data: DescriptionActiveСhat) => void) =>
    socket.off(ID_CHAT, callback),
};

export const chatSocket = {
  emit: (callback: object) => socket.emit(MESSAGE, callback),
};
export const layoutSocket = {
  emit: (callback: string | null) => socket.emit(DISCONNECT, callback),
};
export const AutorizationSoket = {
  emit: (callback: User) => socket.emit(NEW_USER, callback),
};

export const currentUser = localStorage.getItem("user");
