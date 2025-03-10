import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";
import Auth from "./Auth";

function Signup() {
  const [createUser] = useCreateUser();

  return (
    <Auth
      submitLabel="Signup"
      handleSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <MUILink
        component={Link}
        to="/login"
        underline="none"
        color="inherit"
        style={{ alignSelf: "center" }}
      >
        Login
      </MUILink>
    </Auth>
  );
}

export default Signup;
