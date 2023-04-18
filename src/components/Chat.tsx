import { Avatar, Text, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { formatTime } from "../utils/helpers";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

interface ChatData {
  sentAt: string;
  sentBy: string;
  text: string;
}

type Props = {
  data: ChatData;
};

const useStyles = createStyles((theme) => ({
  messageName: {
    gap: theme.spacing.xs,
    display: "flex",
    alignItems: "flex-end",
  },
}));

function Chat(props: Props) {
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState({
    username: "",
    color: "",
  });

  useEffect(() => {
    const unsub = async () => {
      setLoading(true);
      const q = query(
        collection(db, "users"),
        where("uid", "==", props.data.sentBy)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setData({
          username: doc.data().username,
          color: doc.data().color,
        });
        setLoading(false);
      });
    };

    unsub();
  }, []);

  return (
    <>
      {!loading && (
        <>
          <Avatar size={48} radius="xl" color={data.color} />
          <div>
            <div className={classes.messageName}>
              <Text fw="bold">{data.username}</Text>
              <Text fz="xs" c="dimmed">
                {formatTime(props.data.sentAt)}
              </Text>
            </div>
            <Text>{props.data.text}</Text>
          </div>
        </>
      )}
    </>
  );
}

export default Chat;
