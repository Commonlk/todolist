import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../api/agent";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputId = e.target.id;
    const value = e.target.value;

    if (inputId === "name") setName(value);
    if (inputId === "email") setEmail(value);
    if (inputId === "password") setPassword(value);
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name && email && password) {
      try {
        const user = await agent.Account.signup({ name, email, password });
        localStorage.setItem("token", user.token);
        navigate("/todos");
      } catch (error) {}
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 15 }}>
      <Typography variant="h4" sx={{ fontSize: 16, textAlign: "center" }}>
        Signup to get started
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
        <TextField
          required
          id="name"
          label="Your name"
          size="small"
          onChange={handleInput}
          value={name}
        />

        <TextField
          required
          id="email"
          label="Email"
          size="small"
          onChange={handleInput}
          value={email}
        />

        <TextField
          required
          id="password"
          label="Password"
          type="password"
          size="small"
          onChange={handleInput}
          value={password}
        />

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
            SIGN UP
          </Button>
          <Typography variant="caption">
            Already have an account?{" "}
            <Link style={{ color: "inherit" }} to="/signin">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
