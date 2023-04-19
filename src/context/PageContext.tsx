import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface PageContext {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

export const PageContext = createContext<PageContext>({
  currentPage: "",
  setCurrentPage: () => {},
});

export const PageContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [currentPage, setCurrentPage] = useState<string>("");

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {props.children}
    </PageContext.Provider>
  );
};
