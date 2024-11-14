import { useEffect, useState } from "react";
import { User } from "../types";
import { GET_USERS } from "../../../const";
import { userSocket } from "../socketClient";

// Returns the user list on the server
export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    userSocket.emit(GET_USERS);
    const handleGetUsers = (data: User[]) => setUsers(data);
    userSocket.on(handleGetUsers);
    return () => {
      userSocket.off(handleGetUsers);
    };
  }, []);
  return users;
}
