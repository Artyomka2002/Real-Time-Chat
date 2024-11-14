import useActiveChat from "./useActiveChat";
import { useState } from "react";
import { User } from "../types";
import { DescriptionActiveСhat } from "../types";
import { currentUser } from "../socketClient";
import { currentChatSocket } from "../socketClient";
// Returns the users of the current chat
export default function useCurrentChat() {
  const [currentChat, setCurrentChat] = useState<DescriptionActiveСhat | null>(null);
  const { activeChats, setActiveChats } = useActiveChat();

  const openChatWithUser = (user: User) => {
    if (!currentUser) return;

    const chatIdentifier = { user1: currentUser, user2: user.name };

    currentChatSocket.emit({
      user1: chatIdentifier.user1,
      user2: chatIdentifier.user2,
      idChat: `${user.name}-${user.socketID}`,
    });

    // Checking if the chat exists
    const chatExists = activeChats.some(
      (chat) =>
        (chat.user1 === chatIdentifier.user1 &&
          chat.user2 === chatIdentifier.user2) ||
        (chat.user1 === chatIdentifier.user2 &&
          chat.user2 === chatIdentifier.user1)
    );

    if (!chatExists) setActiveChats((prev) => [...prev, chatIdentifier]);
    setCurrentChat(chatIdentifier);
  };
  return { currentChat, openChatWithUser, setCurrentChat };
}
