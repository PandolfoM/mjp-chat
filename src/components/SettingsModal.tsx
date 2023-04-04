import { Button, Modal, createStyles } from "@mantine/core";
import { signOut } from "firebase/auth";
import { LogOut } from "react-feather";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

type Props = {
  opened: boolean;
  close: any;
};

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    maxWidth: 240,
    minWidth: 240,
    zIndex: 10,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.dark[8],
  },

  root: {
    height: "100%",
  },

  allChats: {
    height: "100%",
    overflowY: "auto",
  },

  currentUserContainer: {
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.dark[6],
  },
}));

function SettingsModal(prop: Props) {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const handleSignout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Modal
      opened={prop.opened}
      onClose={prop.close}
      withCloseButton={false}
      centered
      size="80%"
      classNames={{ root: classes.root, body: classes.container }}>
      <Button
        rightIcon={<LogOut />}
        variant="subtle"
        onClick={() => handleSignout()}>
        Logout
      </Button>
    </Modal>
  );
}

export default SettingsModal;
