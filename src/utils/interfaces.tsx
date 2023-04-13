export interface User {
  color: string;
  status: string;
  email: string;
  uid: string;
  username: string;
  friends?: Array<string>;
}

export interface Chat {
  id: string,
  lastMessage: string,
  users: Array<string>
}
