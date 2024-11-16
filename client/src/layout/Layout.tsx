import { useNavigate } from "react-router-dom";
import cl from "./Layout.module.css";
import { useState } from "react";
import Chat from "../components/containerChat/containerChat";
import Modal from "../UI/modal/modal";
import useUsers from "../hooks/useUsers";
import useActiveChat from "./../hooks/useActiveChat";
import useCurrentChat from "./../hooks/useCurrentChat";
import { CHAT_WITH_A_FRIEND } from "../../../const";
import { GENERAL_CHAT } from "../../../const";
import { layoutSocket } from "../socketClient";
import { DescriptionActiveСhat } from "../types";
import ListUsers from "../components/ListUsers/ListUsers";

const Layout = () => {
  const navigate = useNavigate();
  const users = useUsers();
  const { activeChats } = useActiveChat();
  const [modal, setModal] = useState<boolean>(false);
  const { currentChat, openChatWithUser, setCurrentChat } = useCurrentChat();
  const currentUser = localStorage.getItem("user");
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    layoutSocket.emit(currentUser);
    navigate("/");
  };

  // Rendering a custom chat
  const handleChatClick = (chat: DescriptionActiveСhat) => {
    setCurrentChat(chat);
    setModal(false);
  };
  return (
    <>
      <header className={cl.header}>
        <div className={cl.headerContainer}>
          <span>Ваше имя : {currentUser}</span>
          <div
            className={cl.ChoosingAnInterlocutor}
            onClick={() => setModal(true)}
          >
            <span>
              В сети {users.length}{" "}{users.length === 1 || users.length > 5 || users.length === 0 ? "человек" : "человека"}
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
      <main className={cl.main}>
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
            userSocketID={currentChat.user2} //We pass the name with which the chat was created as the socket ID
            descriptionInterlocutor={CHAT_WITH_A_FRIEND}
            key={`${currentChat.user1}-${currentChat.user2}`}
          />
        )}
        <Chat descriptionInterlocutor={GENERAL_CHAT} />
      </main>

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <span>Выберите пользователя и начните общаться!</span>
        {users.map((user) => {
          return user.name !== currentUser ? (
            <ListUsers
              user={user}
              openChatWithUser={openChatWithUser}
              setModal={setModal}
            />
          ) : null;
        })}
      </Modal>
    </>
  );
};

export default Layout;
