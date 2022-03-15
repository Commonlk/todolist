import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 15 }}>
      <Typography variant="h4" sx={{ fontSize: 16, textAlign: "center" }}>
        Signup to get started
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: { sm: "80%", xs: "100%" } },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
        autoComplete="off"
      >
        <TextField required id="name" label="Your name" />
        <TextField required id="email" label="Email" />
        <TextField required id="password" label="Password" type="password" />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row-reverse" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            width: { sm: "80%", xs: "100%" },
          }}
        >
          <Button sx={{ width: { xs: "100%", sm: "30%" } }} variant="contained">
            SIGN UP
          </Button>
          <Typography variant="caption">
            Already have an account? <Link to="/signin">Sign in</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
