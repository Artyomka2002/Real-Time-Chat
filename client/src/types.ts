
export interface User {
  name: string;
  socketID?: string;
}

export interface Message {
  id: number | string;
  name: string;
  messageName: string;
  socketID: string;
}

export interface ChatPropsType {
  descriptionInterlocutor?: string;
  userSocketID?: string;
}

export interface UserType {
  id: string;
  name: string;
}

export interface MessagesChat {
  name: string;
  socketID: string;
  text: Array<object>;
}
export interface DescriptionActiveСhat {
  user1: string;
  user2: string;
  idChat?: string;
}


