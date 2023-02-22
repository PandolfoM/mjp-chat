import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";

export default function Home() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const unsub = () => {
      if (!user) {
        router.push("/login");
      }
    };

    return unsub;
  }, []);

  return (
    <main>
      <h1>Hello World</h1>
    </main>
  );
}
