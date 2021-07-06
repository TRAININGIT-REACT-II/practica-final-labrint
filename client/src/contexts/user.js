import { createContext } from "react";

const User = createContext({
  username: "",
  token:"",
  id:"",
  updateUser: () => {},
});

export default User;
