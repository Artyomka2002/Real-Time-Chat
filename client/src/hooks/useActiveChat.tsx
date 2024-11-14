import { useEffect, useState } from "react";
import { DescriptionActiveСhat } from "../types";
import { ActiveChatSocket } from "../socketClient";
import { currentUser } from "../socketClient";

// The request returns an active chat. The chat is described as 2 interlocutors and a chat ID
export default function useActiveChat() {
  const [activeChats, setActiveChats] = useState<Array<DescriptionActiveСhat>>([]);
  useEffect(() => {
    const handleNewChatId = (data: DescriptionActiveСhat) => {

      // user2 - the received user
      if (data.user2 === currentUser) {
        const newChat = { user1: data.user1, user2: currentUser! };

        // Checking whether the chat already exists in this state
        const chatExists = activeChats.some(
          (chat) =>
            (chat.user1 === newChat.user1 && chat.user2 === newChat.user2) ||
            (chat.user1 === newChat.user2 && chat.user2 === newChat.user1)
        );

        if (!chatExists) setActiveChats((prev) => [...prev, newChat]);
      }
    };

    ActiveChatSocket.on(handleNewChatId);

    return () => {
      ActiveChatSocket.off(handleNewChatId);
    };
  }, [activeChats]);
  return { activeChats, setActiveChats };
}
