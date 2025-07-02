import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const { login, error } = useLogin();

  return (
    <Auth
      submitLabel="Login"
      handleSubmit={(request) => login(request)}
      error={error}
    >
      <MUILink
        component={Link}
        to="/signup"
        underline="none"
        color="inherit"
        style={{ alignSelf: "center" }}
      >
        Signup
      </MUILink>
    </Auth>
  );
}

export default Login;
