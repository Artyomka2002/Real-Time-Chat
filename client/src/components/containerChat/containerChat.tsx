import cl from "./containerChat.module.css";
import React from "react";
import Input from "../input/input";
import { useState, useEffect } from "react";
import { socket } from "../../socketClient";
import { Message } from "../../types";
import { ChatPropsType } from "../../types";
import ListMessages from "./componentsContainerChat/ListMessages";
import { currentUser } from "../../socketClient";
import { chatSocket } from "../../socketClient";
const Chat: React.FC<ChatPropsType> = ({
  userSocketID,
  descriptionInterlocutor,
}) => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [message, setMessage] = useState<string>("");

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && currentUser) {
      const msgData = {
        text: message,
        name: currentUser,
        id: `${socket.id}-${Math.random()}`,
        socketID: `${userSocketID}`,
      };
      chatSocket.emit(msgData);
      setMessage("");
    }
  };
  useEffect(() => {
    socket.on(`response_${userSocketID}`, (data: Message[]) => {
      setMessages(() => data);
    });

    return () => {
      socket.off(`response_${userSocketID}`);
    };
  }, [userSocketID]);

  return (
    <div className={cl.rightContainer}>
      <div style={{ textAlign: "center", padding: "18px 0 0 0" }}>
        {descriptionInterlocutor}
      </div>
      <div className={cl.container}>
        <ListMessages messages={messages} currentUser={currentUser} />
      </div>
      <div style={{ padding: "30px" }}>
        <form onSubmit={handleSend} style={{ display: "flex" }}>
          <Input
            id={"message"}
            value={message}
            setUsers={setMessage}
            placeholder="Введите сообщение"
            className={cl.chatConteinerUnput}
          />
          <button className={cl.chatConteinerButton}>Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
