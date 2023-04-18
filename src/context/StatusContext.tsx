import { useIdle, useLocalStorage } from "@mantine/hooks";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBeforeUnload } from "react-router-dom";
import { AuthContext } from "../auth/context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface StatusContext {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

export const StatusContext = createContext<StatusContext>({
  status: "online",
  setStatus: () => {},
  currentPage: "",
  setCurrentPage: () => {},
});

export const StatusContextProvider = (props: React.PropsWithChildren<{}>) => {
  const { currentUser } = useContext(AuthContext);
  const [status, setStatus] = useState<string>("online");
  const [currentPage, setCurrentPage] = useState<string>("");
  const idle = useIdle(5000);

  const updateStatus = async (idle: string) => {
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser?.uid), {
        status: idle,
      });
    }
  };

  updateStatus(idle ? "idle" : "online");

  useBeforeUnload(() => updateStatus("offline"));

  return (
    <StatusContext.Provider
      value={{ status, setStatus, currentPage, setCurrentPage }}>
      {props.children}
    </StatusContext.Provider>
  );
};
