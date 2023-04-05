import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { User as UserAuth } from "firebase/auth";

type Props = {
  children: any;
};

export const AuthContext = createContext<any>(null);

export const AuthContextProvider = (prop: Props) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {prop.children}
    </AuthContext.Provider>
  );
};
