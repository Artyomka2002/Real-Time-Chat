import { useEffect, useState } from "react";
import { socket } from "../socketClient";
import { ID_CHAT } from "../../../const";

export default function useActiveChat() {
  const [activeChats, setActiveChats] = useState<
    Array<{ user1: string; user2: string }>
  >([]);
  useEffect(() => {
    const handleNewChatId = (data: {
      user1: string;
      user2: string;
      idChat: string;
    }) => {
      const currentUser = localStorage.getItem("user");

      // user2 - the received user
      if (data.user2 === currentUser) {
        const newChat = { user1: data.user1, user2: currentUser! };

        // Checking whether the chat already exists in this state
        const chatExists = activeChats.some(
          (chat) =>
            (chat.user1 === newChat.user1 && chat.user2 === newChat.user2) ||
            (chat.user1 === newChat.user2 && chat.user2 === newChat.user1)
        );

        if (!chatExists) {
          setActiveChats((prev) => [...prev, newChat]);
        }
      }
    };

    socket.on(ID_CHAT, handleNewChatId);

    return () => {
      socket.off(ID_CHAT, handleNewChatId);
    };
  }, [activeChats]);
  return { activeChats, setActiveChats };
}
