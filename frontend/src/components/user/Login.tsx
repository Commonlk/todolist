import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 5, padding: 0 }}>
        <Box
          component="img"
          sx={{
            width: { xs: "100%" },
            height: { xs: "60vw", sm: "300px" },
          }}
          src="/images/white-notes.jpg"
          alt="white-notes"
        />
      </Container>
      <Container maxWidth="sm" sx={{ marginTop: 5 }}>
        <Box>
          <Grid
            container
            direction="column"
            rowSpacing={2}
            justifyContent="center"
          >
            <Grid
              container
              item
              direction="column"
              alignItems="center"
              rowSpacing={1}
            >
              <Grid item>
                <Typography textAlign="center" variant="subtitle1">
                  Already have an account?
                </Typography>
              </Grid>
              <Grid item>
                <Link to="/signin">
                  <Button sx={{ minWidth: "160px" }} variant="outlined">
                    Sign in
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction="column"
              alignItems="center"
              rowSpacing={1}
            >
              <Grid item>
                <Typography textAlign="center" variant="subtitle1">
                  Sign up today and keep your todos in check!
                </Typography>
              </Grid>
              <Grid item>
                <Link to="/signup">
                  <Button sx={{ minWidth: "160px" }} variant="contained">
                    Sign up
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Login;
