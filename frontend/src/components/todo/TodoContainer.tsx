import { Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import agent from "../../api/agent";
import { useTodoContext } from "../../contexts/TodoContext";
import TodoCard from "./TodoCard";

const TodoContainer = () => {
  const { todos, setTodos } = useTodoContext();

  useEffect(() => {
    try {
      const getTodos = async () => {
        const todos = await agent.Todos.todoList();
        if (todos) setTodos(todos);
      };

      getTodos();
    } catch (error) {
      console.log(error);
    }
  }, [setTodos]);

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
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TodoContainer;
