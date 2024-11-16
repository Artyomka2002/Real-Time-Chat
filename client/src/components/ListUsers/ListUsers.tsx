import { User } from "../../types";
import cl from "./ListUsers.module.css";

type ListProp = {
  user: User;
  openChatWithUser: (str: User) => void;
  setModal: (arg: boolean) => void;
};

const ListUsers = ({ user, openChatWithUser, setModal }: ListProp) => {
  return (
    <>
      <div
        className={cl.userNameInModal}
        style={{ padding: "10px", cursor: "pointer" }}
        key={user.socketID}
        onClick={() => {
          openChatWithUser(user);
          setModal(false);
        }}
      >
        {user.name}
      </div>
    </>
  );
};
export default ListUsers;
