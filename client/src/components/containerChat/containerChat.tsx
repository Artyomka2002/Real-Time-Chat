import cl from "./containerChat.module.css";
import React from "react";
import Input from "../../UI/input/input";
import { useState, useEffect } from "react";
import { socket } from "../../socketClient";
import { Message } from "../../types";
import { ChatPropsType } from "../../types";
import ListMessages from "./componentsContainerChat/ListMessages";

import { chatSocket } from "../../socketClient";
const Chat: React.FC<ChatPropsType> = ({
  userSocketID,
  descriptionInterlocutor,
  setRenderChat,
}) => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [message, setMessage] = useState<string>("");
  const currentUser = localStorage.getItem("user");

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
      
      <div className={cl.descriptionContainer}>
        <span>
          {descriptionInterlocutor}
          <span
          className={cl.closeChange}
          onClick={() => setRenderChat?.(false)}>{setRenderChat ? "𐄂" : ''}</span>  {/* a crutch within the framework of the project */}
        </span>
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
