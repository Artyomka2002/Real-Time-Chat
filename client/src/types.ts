export interface User {
  name: string;
  socketID?: string;
}

export interface Message {
  id: number | string;
  name: string;
  messageName: string;
  socketID: string ;
}

export interface ChatPropsType {
  descriptionInterlocutor?: string;
  userSocketID?: string;
  setRenderChat?: (arg: boolean) => void;
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
  user1: string | null;
  user2: string;
  idChat?: string;
}
