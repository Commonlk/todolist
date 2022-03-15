import { AddRounded, HomeRounded, PersonRounded } from "@mui/icons-material";
import { Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Container maxWidth="sm">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        maxWidth="sm"
        direction="row"
        sx={{ marginTop: "20px" }}
      >
        <Grid item>
          <Typography variant="h1" fontSize={16} fontWeight={600}>
            TODOLIST
          </Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Grid item>
              <IconButton aria-label="home">
                <Link to="/todos">
                  <HomeRounded />
                </Link>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="add-card">
                <Link to="/create">
                  <AddRounded />
                </Link>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="user">
                <PersonRounded />
              </IconButton>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
