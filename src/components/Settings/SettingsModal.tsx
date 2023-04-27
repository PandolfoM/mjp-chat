import { Button, Modal, createStyles } from "@mantine/core";
import { signOut } from "firebase/auth";
import { LogOut } from "react-feather";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyAccount from "./MyAccount";

type Props = {
  opened: boolean;
  close: any;
};

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    zIndex: 10,
    height: "80vh",
    overflow: "hidden",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    width: 150,
    backgroundColor: theme.colors.dark[8],
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },

  content: {
    marginLeft: 150,
  },

  root: {
    height: "100%",
  },

  allChats: {
    height: "100%",
    overflowY: "auto",
  },
}));

function SettingsModal(prop: Props) {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState("myAccount");

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
      <div className={classes.nav}>
        <div>
          <Button variant="subtle" onClick={() => setCurrentPage("myAccount")}>
            My Account
          </Button>
        </div>
        <div>
          <Button
            rightIcon={<LogOut />}
            variant="subtle"
            onClick={() => handleSignout()}>
            Logout
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        {
          {
            myAccount: <MyAccount />,
          }[currentPage]
        }
      </div>
    </Modal>
  );
}

export default SettingsModal;
