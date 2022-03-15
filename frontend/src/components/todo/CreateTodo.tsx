import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const CreateTodo = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ fontSize: 16 }}>
        New todo
      </Typography>
      <Box component="form" autoComplete="off" sx={{ marginTop: 2 }}>
        <TextField fullWidth required id="title" label="Title" />
        <TextField
          sx={{ marginTop: 2 }}
          fullWidth
          multiline
          maxRows={8}
          minRows={5}
          id="description"
          label="Description"
        />
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
          <FormControlLabel
            control={<Checkbox />}
            label="Important"
            labelPlacement="start"
          />
        </Box>
        <Button sx={{ marginTop: 2 }} fullWidth variant="contained">
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTodo;
