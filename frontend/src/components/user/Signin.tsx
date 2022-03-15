import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 15 }}>
      <Typography variant="h4" sx={{ fontSize: 16, textAlign: "center" }}>
        Sign in to get started
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
            SIGN IN
          </Button>
          <Typography variant="caption">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
