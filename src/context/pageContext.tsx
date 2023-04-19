import { Dispatch, SetStateAction, createContext, useState } from "react";

interface PageContext {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

export const PageContext = createContext<PageContext>({
  currentPage: "friends",
  setCurrentPage: () => {},
});

export const PageContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [currentPage, setCurrentPage] = useState<string>("friends");

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {props.children}
    </PageContext.Provider>
  );
};
