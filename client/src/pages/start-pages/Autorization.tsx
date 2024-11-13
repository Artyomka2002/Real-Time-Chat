import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import cl from "./Autorization.module.css";
import { useState } from "react";
import { socket } from "../../socketClient";
import { NEW_USER } from "../../../../const";
const Autorization = () => {
  console.log(socket);
  const navigate = useNavigate();
  const [user, setUser] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("user", user);
    navigate("/chats");
    socket.emit(NEW_USER, { name: user, socketID: socket.id });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={cl.containerForm}>
          <div className={cl.InputsBox}>
            <Input
              placeholder={"Введите ваше имя"}
              id={"startIdNames"}
              className={cl.unputs}
              value={user}
              setUsers={setUser}
            />
            <Input
              placeholder={"AdminPassword"}
              id={"startIdTel"}
              className={cl.unputs}
              error="Не нужно вводить , если хотите войти как гость"
            />
            <button
              style={{
                height: "144px",
                borderRadius: "25px",
                backgroundColor: "#3535ff",
                color: "#fff",
              }}
            >
              Войти
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Autorization;
