import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";
import { UNKNOWN_ERROR_MESSAGE } from "../constants/errors";

interface LoginRequest {
  email: string;
  password: string;
}

console.log("API_URL:", API_URL);

const useLogin = () => {
  const [error, setError] = useState<string>();

  console.log("API_URL:", API_URL);

  const login = async (request: LoginRequest) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(request),
    });
    if (!res.ok) {
      if (res.status === 401) {
        setError("Credentials are not valid.");
      } else {
        setError(UNKNOWN_ERROR_MESSAGE);
      }
      return;
    }
    setError("");
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useLogin };
