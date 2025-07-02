import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Link as MUILink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";
import Auth from "./Auth";
import { extractErrorMessage } from "../../utils/errors";
import { useState } from "react";

function Signup() {
  const [createUser] = useCreateUser();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  return (
    <Auth
      submitLabel="Signup"
      error={error}
      handleSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
          setError("");
          navigate("/login");
        } catch (err) {
          const errorMessage = extractErrorMessage(err);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError("Unknown error occured.");
        }
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
