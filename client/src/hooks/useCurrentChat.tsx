import useActiveChat from "./useActiveChat";
import { socket } from "../socketClient";
import { useState } from "react";
import { User } from "../types";
import { UniquenessofTheChat } from "../../../const";

export default function useCurrentChat({
  setModal,
}: {
  setModal?: (value: boolean) => void;
}) {
  const [currentChat, setCurrentChat] = useState<{
    user1: string;
    user2: string;
  } | null>(null);
  const { activeChats, setActiveChats } = useActiveChat();

  const openChatWithUser = (user: User) => {
    const currentUser = localStorage.getItem("user");

    if (!currentUser) {
      return;
    }

    const chatIdentifier = { user1: currentUser, user2: user.name };

    socket.emit( UniquenessofTheChat , {
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

    if (!chatExists) {
      setActiveChats((prev) => [...prev, chatIdentifier]);
    }
    setCurrentChat(chatIdentifier);

    if (setModal) setModal(false);
  };
  return { currentChat, openChatWithUser, setCurrentChat };
}
