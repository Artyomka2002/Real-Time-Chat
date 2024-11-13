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
  chatsPeopleName?: string;
  userSocketID?: string;
  users?: User[];
}
