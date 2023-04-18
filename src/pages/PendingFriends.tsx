import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../auth/context";
import ListPending from "../components/ListPending";
import { Title } from "@mantine/core";

interface RequestsDoc {
  to: string;
  from: string;
  id: string;
}

function PendingFriends() {
  const { currentUser } = useContext(AuthContext);
  const [requests, setRequests] = useState<Array<RequestsDoc>>();

  useEffect(() => {
    const unsub = async () => {
      const q = query(
        collection(db, "requests"),
        or(
          where("to", "==", currentUser.uid),
          where("from", "==", currentUser.uid)
        )
      );

      onSnapshot(q, (querySnapshot) => {
        const arr: any = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        setRequests(arr);
      });
    };

    unsub();
  }, []);

  return (
    <>
      {requests?.map((i) => (
        <div key={i.id}>
          {i.from !== currentUser.uid && (
            <>
              <Title order={5}>Incoming</Title>
              <ListPending uid={i.from} id={i.id} incoming={true} />
            </>
          )}
          {i.to !== currentUser.uid && (
            <>
              <Title order={5}>Outgoing</Title>
              <ListPending uid={i.to} id={i.id} incoming={false} />
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default PendingFriends;
