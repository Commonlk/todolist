import { Container, Grid, Typography } from "@mui/material";
import { Todo } from "../../models/todo";
import TodoCard from "./TodoCard";

interface Props {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: Todo) => void;
}

const TodoContainer = ({ todos, deleteTodo, updateTodo }: Props) => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h3" fontSize={16}>
        Todos
      </Typography>
      <Grid container sx={{ marginTop: 2 }} spacing={2}>
        {todos.map(todo => (
          <Grid key={todo.id} item sx={{ minWidth: "100%" }}>
            <TodoCard
              id={todo.id}
              title={todo.title}
              description={todo.description}
              important={todo.important}
              createdAt={todo.createdAt}
              completed={todo.completed}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TodoContainer;
