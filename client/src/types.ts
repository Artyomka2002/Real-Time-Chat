export interface User {
  name: string;
  socketID: string;
}

export interface Message {
  id: number | string;
  name: string;
  messageName: string;
  socketID: string;
}

export interface ChatPropsType {
  userName?: string;
  descriptionInterlocutor?: string;
  userSocketID?: string;
  users?: User[];
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
