import { onAuthStateChanged } from "firebase/auth";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { User } from "../utils/interfaces";

interface AuthContext {
  friends: User[];
  setFriends: Dispatch<SetStateAction<User[]>>;
  currentUser?: any;
  setCurrentUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
  currentUserDoc?: User;
  setCurrentUserDoc: Dispatch<SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContext>({
  friends: [],
  setFriends: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  loading: true,
  currentUserDoc: { color: "", email: "", uid: "", username: "" },
  setCurrentUserDoc: () => {},
});

export const AuthContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [friends, setFriends] = useState<Array<User>>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentUserDoc, setCurrentUserDoc] = useState<User>({
    color: "",
    email: "",
    uid: "",
    username: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { getFriends, getUserDoc } = useAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getFriends(setFriends, user);
        getUserDoc(setCurrentUserDoc, user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        friends,
        setFriends,
        currentUserDoc,
        setCurrentUserDoc,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
