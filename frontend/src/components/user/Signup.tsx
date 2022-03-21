import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../api/agent";
import { useAuthContext } from "../../contexts/AuthContext";

const Signup = () => {
  const { setAuthenticated, setToken } = useAuthContext();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await agent.Account.signup(inputs);

      setToken(user.token);
      setAuthenticated(true);

      navigate("/todos");
    } catch (error) {}
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
          label="Your name"
          size="small"
          name="name"
          onChange={handleInput}
          value={inputs.name}
        />

        <TextField
          required
          label="Email"
          size="small"
          name="email"
          onChange={handleInput}
          value={inputs.email}
        />

        <TextField
          required
          label="Password"
          type="password"
          size="small"
          name="password"
          onChange={handleInput}
          value={inputs.password}
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
