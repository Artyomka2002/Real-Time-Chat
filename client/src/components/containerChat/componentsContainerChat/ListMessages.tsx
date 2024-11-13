import cl from "./ListMessages.module.css";
import { Message } from "../../../types";

const ListMessages = ({
  messages,
  currentUser,
}: {
  messages: Array<Message>;
  currentUser: string | null;
}) => {
  return (
    <>
      {messages.length == 0 ? (
        <p style={{ textAlign: "center", marginTop: "50vh" }}>
          Отправьте сообщение и продолжите диалог!
        </p>
      ) : (
        ""
      )}
      {messages.map((element, index) => (
        <div key={element.id || index} className={cl.chats}>
          {element.name === currentUser ? (
            <>
              <p className={cl.senderName}>Вы</p>
              <div className={cl.messageSender}>
                <p>{element.messageName}</p>
              </div>
            </>
          ) : (
            <>
              <p className={cl.senderNameRecipient}>{element.name}</p>
              <div className={cl.messageRecipient}>
                <p>{element.messageName}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};
export default ListMessages;
