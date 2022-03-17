import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import agent from "../../api/agent";
import { Todo } from "../../models/todo";

interface Props {
  todos: Todo[];
  updateTodo: (id: string, updatedTodo: Todo) => void;
}

const EditTodo = ({ todos, updateTodo }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);

  useEffect(() => {
    if (id) {
      const todo = todos.find(todo => todo.id == id);

      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
        setImportant(todo.important);
      } else {
        navigate("/todos");
      }
    }
  }, []);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        const updatedTodo = await agent.Todos.edit(id, {
          title,
          important,
          description,
        });

        updateTodo(id, updatedTodo);
        navigate("/todos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ fontSize: 16 }}>
        Edit todo
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        sx={{ marginTop: 2 }}
        onSubmit={handleSubmit}
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
            control={<Checkbox onChange={handleCheck} checked={important} />}
            label="Important"
            labelPlacement="start"
          />
        </Box>
        <Button
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
          type="submit"
        >
          Edit
        </Button>
      </Box>
    </Container>
  );
};

export default EditTodo;
