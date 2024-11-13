import { useNavigate } from "react-router-dom";
import cl from "./Layout.module.css";
import { useState } from "react";
import Chat from "../components/containerChat/containerChat";
import Modal from "../components/modal/modal";
import useUsers from "../hooks/useUsers";
import useActiveChat from "./../hooks/useActiveChat";
import useCurrentChat from "./../hooks/useCurrentChat";
import { socket } from "../socketClient";

const Layout = () => {
  const navigate = useNavigate();
  const users = useUsers();
  const { activeChats } = useActiveChat();
  const [modal, setModal] = useState<boolean>(false);
  const { currentChat, openChatWithUser, setCurrentChat } = useCurrentChat({
    setModal,
  });
  const clientUser = localStorage.getItem("user");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    socket.emit("disconnect_user", clientUser);
    navigate("/");
  };

  // Rendering a custom chat
  const handleChatClick = (chat: { user1: string; user2: string }) => {
    setCurrentChat(chat);
    setModal(false);
  };

  return (
    <>
      <header className={cl.header}>
        <div className={cl.headerContainer}>
          <span>Ваше имя : {clientUser}</span>
          <div
            className={cl.ChoosingAnInterlocutor}
            onClick={() => setModal(true)}
          >
            <span>
              В сети {users.length}{" "}
              {users.length === 1 || users.length > 5 || users.length === 0
                ? "человек"
                : "человека"}
            </span>
            <span style={{ fontSize: "12px" }}>
              Нажмите и выберите собеседника среди пользователей!
            </span>
          </div>
          <button onClick={handleSubmit} className={cl.header_button}>
            Выйти из чата
          </button>
        </div>
      </header>
      <div className={cl.main}>
        <div className={cl.leftContainer}>
          {activeChats.map((chat, index) => (
            <div
              key={index}
              className={cl.chatSlide}
              onClick={() => handleChatClick(chat)}
            >
              {chat.user1} и {chat.user2}
            </div>
          ))}
        </div>

        {currentChat && (
          <Chat
            key={`${currentChat.user1}-${currentChat.user2}`} // Правильное использование шаблонных литералов
            userName={currentChat.user1}
            userSocketID={currentChat.user2}
            users={users}
            chatsPeopleName={"Чат с другом"}
          />
        )}
        <Chat chatsPeopleName={"Общий чат"} />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div>Выберите пользователя и начните общаться!</div>
        {users.map((user) => (
          <div
            className={cl.userNameInModal}
            style={{ padding: "10px", cursor: "pointer" }}
            key={user.socketID}
            onClick={() => openChatWithUser(user)}
          >
            {user.name}
          </div>
        ))}
      </Modal>
    </>
  );
};

export default Layout;
