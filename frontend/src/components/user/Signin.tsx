import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../api/agent";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputId = e.target.id;
    const value = e.target.value;

    if (inputId === "email") {
      setEmail(value);
    }
    if (inputId === "password") {
      setPassword(value);
    }
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        const user = await agent.Account.signin({ email, password });
        localStorage.setItem("token", user.token);
        navigate("/todos");
      } catch (error) {
        setError(true);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 15 }}>
      <Typography variant="h4" sx={{ fontSize: 16, textAlign: "center" }}>
        Sign in to get started
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            marginBottom: 1,
            width: { sm: "80%", xs: "100%" },
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
        autoComplete="off"
        onSubmit={handleForm}
      >
        <FormControl sx={{ width: "100%", alignItems: "center" }}>
          <TextField
            required
            id="email"
            label="Email"
            onChange={handleInput}
            size="small"
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            onChange={handleInput}
            size="small"
          />
          {error && <FormHelperText error>Invalid credentials</FormHelperText>}
        </FormControl>
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: { xs: "column", sm: "row-reverse" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            width: { sm: "80%", xs: "100%" },
          }}
        >
          <Button
            sx={{ width: { xs: "100%", sm: "30%" } }}
            variant="contained"
            type="submit"
          >
            SIGN IN
          </Button>
          <Typography variant="caption">
            Don’t have an account?{" "}
            <Link style={{ color: "inherit" }} to="/signup">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
