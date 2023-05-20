import { useContext } from "react";
import { AuthContext } from "../../auth/context";
import {
  Avatar,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import useAuth from "../../hooks/useAuth";
import { notifications } from "@mantine/notifications";
import { Check, X } from "react-feather";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
  },

  user: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
  },

  userContainer: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.dark[8],
    borderRadius: theme.spacing.sm,
  },

  userInfo: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.spacing.sm,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.sm,
  },

  userInfoSub: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

function MyAccount() {
  const { classes } = useStyles();
  const { currentUser, currentUserDoc } = useContext(AuthContext);
  const { updateUsername, updateUserEmail, sendResetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (e.target.email.value) {
      const updateEmail = await updateUserEmail(
        e.target.email.value,
        e.target.password.value
      );

      modals.closeAll();
      if (updateEmail) {
        updateEmail === "Success" && navigate("/login");

        notifications.show({
          title: updateEmail,
          message: "",
          color: updateEmail === "Success" ? "green" : "red",
          icon: updateEmail === "Success" ? <Check /> : <X />,
        });
      }
    } else {
      const usernameUpdate = await updateUsername(
        e.target.username.value,
        e.target.password.value
      );

      modals.closeAll();
      if (usernameUpdate) {
        notifications.show({
          title: usernameUpdate,
          message: "",
          color: "red",
          icon: <X />,
        });
      }
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Title order={4}>My Account</Title>
        <div className={classes.userContainer}>
          <div className={classes.user}>
            <Avatar size={70} radius={40} color={currentUserDoc?.color} />
            <div>
              <Text fw="bold" truncate size={25}>
                {currentUser.displayName}
              </Text>
            </div>
          </div>
          <div className={classes.userInfo}>
            <div className={classes.userInfoSub}>
              <div>
                <Title order={6}>Username</Title>
                <Text size={18} fw="bold">
                  {currentUser.displayName}
                </Text>
              </div>
              <Button
                size="xs"
                onClick={() => {
                  modals.open({
                    centered: true,
                    zIndex: 500,
                    title: "Change Username",
                    children: (
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <Stack>
                          <TextInput
                            label="Username"
                            withAsterisk
                            data-autofocus
                            name="username"
                          />
                          <PasswordInput
                            label="Password"
                            withAsterisk
                            name="password"
                          />
                          <Button type="submit" fullWidth>
                            Submit
                          </Button>
                        </Stack>
                      </form>
                    ),
                  });
                }}>
                Edit
              </Button>
            </div>
            <div className={classes.userInfoSub}>
              <div>
                <Title order={6}>Email</Title>
                <Text size={18} fw="bold">
                  {currentUser.email}
                </Text>
              </div>
              <Button
                size="xs"
                onClick={() => {
                  modals.open({
                    centered: true,
                    zIndex: 500,
                    title: "Update email address",
                    children: (
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <Stack>
                          <TextInput
                            label="Email"
                            withAsterisk
                            data-autofocus
                            name="email"
                          />
                          <PasswordInput
                            label="Password"
                            withAsterisk
                            name="password"
                          />
                          <Button type="submit" fullWidth>
                            Submit
                          </Button>
                        </Stack>
                      </form>
                    ),
                  });
                }}>
                Edit
              </Button>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            modals.openConfirmModal({
              centered: true,
              zIndex: 500,
              title: "Password reset",
              children: (
                <>
                  <Title order={5}>
                    We will send you an email with a link to reset your
                    password.
                  </Title>
                </>
              ),
              labels: { confirm: "Confirm", cancel: "Cancel" },
              cancelProps: { fullWidth: true },
              confirmProps: { fullWidth: true },
              onConfirm: () => sendResetPassword(),
            });
          }}>
          Change Password
        </Button>
      </div>
    </>
  );
}

export default MyAccount;
