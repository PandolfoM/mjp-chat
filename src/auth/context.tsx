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
}

export const AuthContext = createContext<AuthContext>({
  friends: [],
  setFriends: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  loading: true,
});

export const AuthContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [friends, setFriends] = useState<Array<User>>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { getFriends } = useAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getFriends(setFriends, user);
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
      value={{ currentUser, setCurrentUser, loading, friends, setFriends }}>
      {props.children}
    </AuthContext.Provider>
  );
};
