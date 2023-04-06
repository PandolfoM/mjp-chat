import { Indicator } from "@mantine/core";
import { DocumentData } from "firebase/firestore";
import { User } from "../utils/interfaces";

type Props = {
  user: User;
  children: JSX.Element;
};

function StatusIndicator(props: Props) {
  return (
    <Indicator
      withBorder
      position="bottom-end"
      offset={5}
      size={13}
      color={
        props.user?.status === "idle"
          ? "yellow"
          : props.user?.status === "offline"
          ? "grey"
          : "green"
      }>
      {props.children}
    </Indicator>
  );
}

export default StatusIndicator;
