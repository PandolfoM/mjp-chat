import { Indicator, createStyles } from "@mantine/core";
import { User } from "../utils/interfaces";

type Props = {
  user: User;
  size?: number;
  offset?: number;
  borderColor?: number;
  children: JSX.Element;
  status: string;
};

interface Status {
  borderColor: number;
}

const useStyles = createStyles((theme, { borderColor }: Status) => ({
  indicator: {
    borderColor: theme.colors.dark[borderColor],
  },
}));

function StatusIndicator(props: Props) {
  const { classes } = useStyles({ borderColor: props.borderColor || 9 });
  return (
    <Indicator
      withBorder
      position="bottom-end"
      offset={props.offset || 5}
      size={props.size || 13}
      classNames={{ indicator: classes.indicator }}
      color={
        props.status === "idle"
          ? "yellow"
          : props.status === "offline"
          ? "grey"
          : "green"
      }>
      {props.children}
    </Indicator>
  );
}

export default StatusIndicator;
