import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";

function Signup() {
  return (
    <Auth submitLabel="Signup" handleSubmit={async () => {}}>
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
