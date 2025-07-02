import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useNavigate } from "react-router";

interface AuthProps {
  submitLabel: string;
  handleSubmit: (credential: {
    email: string;
    password: string;
  }) => Promise<void>;
  children?: React.ReactNode;
  error?: string;
}

function Auth({ submitLabel, handleSubmit, children, error }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: user } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "50%",
          lg: "40%",
          xl: "30%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        error={!!error}
        helperText={error}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        error={!!error}
        helperText={error}
      />
      <Button
        variant="contained"
        onClick={() => handleSubmit({ email, password })}
      >
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
}

export default Auth;
