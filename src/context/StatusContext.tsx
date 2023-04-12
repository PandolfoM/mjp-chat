import { useIdle } from "@mantine/hooks";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import useStatus from "../hooks/useStatus";
import { useBeforeUnload } from "react-router-dom";

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
  const { updateStatus } = useStatus();
  const [status, setStatus] = useState<string>("online");
  const [currentPage, setCurrentPage] = useState<string>("");
  const idle = useIdle(600000);
  updateStatus(idle ? "idle" : "online");
  useBeforeUnload(() => updateStatus("offline"));

  return (
    <StatusContext.Provider
      value={{ status, setStatus, currentPage, setCurrentPage }}>
      {props.children}
    </StatusContext.Provider>
  );
};
