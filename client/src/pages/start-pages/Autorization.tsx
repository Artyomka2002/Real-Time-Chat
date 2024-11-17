import { useNavigate } from "react-router-dom";
import Input from "../../UI/input/input";
import cl from "./Autorization.module.css";
import { useState } from "react";
import { socket } from "../../socketClient";
import { AutorizationSoket } from "../../socketClient";
const Autorization = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if(!user) return alert('Введите свое имя!')
    e.preventDefault();
    localStorage.setItem("user", user);
    navigate("/chats");
    AutorizationSoket.emit({ name: user, socketID: socket.id });
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
              setUser={setUser}
            />
            <Input
              placeholder={"AdminPassword"}
              id={"startIdTel"}
              className={cl.unputs}
              label ={"Не нужно вводить , если хотите войти как гость"}
              // Create an administration functionality
            />
            <button className={cl.buttonAutorization}>Войти</button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Autorization;
