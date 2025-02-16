import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";

function Login() {
  return (
    <Auth submitLabel="Login" handleSubmit={async () => {}}>
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
