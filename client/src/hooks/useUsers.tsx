import { useEffect, useState } from "react";
import { User } from "../types";
import { socket } from "../socketClient";
import { GET_USERS } from "./../../../const";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    socket.emit(GET_USERS);
    const handleGetUsers = (data: User[]) => {
      setUsers(data);
    };
    socket.on(GET_USERS, handleGetUsers);
    return () => {
      socket.off(GET_USERS, handleGetUsers);
    };
  }, []);
  return users;
}
