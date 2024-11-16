import { User } from "../../types";
import cl from "./ListUsers.module.css";

type ListProp = {
  user: User;
  openChatWithUser: (str: User) => void;
  setModal: (arg: boolean) => void;
  setRenderChat: (bool: boolean) => void;
};

const ListUsers = ({
  user,
  openChatWithUser,
  setModal,
  setRenderChat,
}: ListProp) => {
  return (
    <>
      <div
        className={cl.userNameInModal}
        style={{ padding: "10px", cursor: "pointer" }}
        key={user.socketID}
        onClick={() => {
          openChatWithUser(user);
          setModal(false);
          setRenderChat(true);
        }}
      >
        {user.name}
      </div>
    </>
  );
};
export default ListUsers;
