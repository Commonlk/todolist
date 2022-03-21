import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../api/agent";
import { useTodoContext } from "../../contexts/TodoContext";

const CreateTodo = () => {
  const { createTodo } = useTodoContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTodo = await agent.Todos.create({
        title,
        description,
        important,
      });
      createTodo(newTodo);

      navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputId = e.currentTarget.id;
    const value = e.currentTarget.value;

    if (inputId === "title") setTitle(value);
    if (inputId === "description") setDescription(value);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportant(e.target.checked);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ fontSize: 16 }}>
        New todo
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        sx={{ marginTop: 2 }}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleForm(e)}
      >
        <TextField
          fullWidth
          required
          id="title"
          label="Title"
          onChange={handleInput}
          value={title}
        />
        <TextField
          sx={{ marginTop: 2 }}
          fullWidth
          multiline
          maxRows={8}
          minRows={5}
          id="description"
          label="Description"
          onChange={handleInput}
          value={description}
        />
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                id="important"
                onChange={handleCheck}
                checked={important}
              />
            }
            label="Important"
            labelPlacement="start"
            value
          />
        </Box>
        <Button
          type="submit"
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTodo;
