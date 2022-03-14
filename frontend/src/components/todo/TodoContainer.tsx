import { Container, Grid, Typography } from "@mui/material";
import TodoCard from "./TodoCard";

const DUMMY_TODOS = [
  {
    title: "Test todo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, perferendis cumque. Earum est doloribus aperiam ducimus natus totam ullam pariatur laboriosam recusandae. Similique voluptatum amet ipsum aliquid recusandae. Temporibus, voluptas?",
    important: false,
    createdAt: "14/03/2022",
  },
  {
    title: "Test todo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, perferendis cumque. Earum est doloribus aperiam ducimus natus totam ullam pariatur laboriosam recusandae. Similique voluptatum amet ipsum aliquid recusandae. Temporibus, voluptas?",
    important: false,
    createdAt: "14/03/2022",
  },
  {
    title: "Test todo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, perferendis cumque. Earum est doloribus aperiam ducimus natus totam ullam pariatur laboriosam recusandae. Similique voluptatum amet ipsum aliquid recusandae. Temporibus, voluptas?",
    important: false,
    createdAt: "14/03/2022",
  },
  {
    title: "Test todo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, perferendis cumque. Earum est doloribus aperiam ducimus natus totam ullam pariatur laboriosam recusandae. Similique voluptatum amet ipsum aliquid recusandae. Temporibus, voluptas?",
    important: false,
    createdAt: "14/03/2022",
  },
  {
    title: "Test todo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, perferendis cumque. Earum est doloribus aperiam ducimus natus totam ullam pariatur laboriosam recusandae. Similique voluptatum amet ipsum aliquid recusandae. Temporibus, voluptas?",
    important: false,
    createdAt: "14/03/2022",
  },
  {
    title: "Test todo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, perferendis cumque. Earum est doloribus aperiam ducimus natus totam ullam pariatur laboriosam recusandae. Similique voluptatum amet ipsum aliquid recusandae. Temporibus, voluptas?",
    important: false,
    createdAt: "14/03/2022",
  },
  {
    title: "Test todo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, perferendis cumque. Earum est doloribus aperiam ducimus natus totam ullam pariatur laboriosam recusandae. Similique voluptatum amet ipsum aliquid recusandae. Temporibus, voluptas?",
    important: false,
    createdAt: "14/03/2022",
  },
];

const TodoContainer = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h3" fontSize={16}>
        Todos
      </Typography>
      <Grid container sx={{ marginTop: 2 }} spacing={2}>
        {DUMMY_TODOS.map((todo, index) => (
          <Grid key={index} item sx={{ minWidth: "100%" }}>
            <TodoCard
              title={todo.title}
              description={todo.description}
              important={todo.important}
              createdAt={todo.createdAt}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TodoContainer;
