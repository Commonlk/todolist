import React, { useState } from "react";
import {
  CheckRounded,
  DeleteRounded,
  DoDisturbAltRounded,
  EditRounded,
  PriorityHighRounded,
} from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { Box } from "@mui/system";
import { useTodoContext } from "../../contexts/TodoContext";

interface Props {
  id: string;
  title: string;
  createdAt: Date;
  description: string;
  important?: boolean;
  completed: boolean;
}

const TodoCard = ({
  createdAt,
  description,
  important,
  title,
  id,
  completed,
}: Props) => {
  const { updateTodo, deleteTodo } = useTodoContext();

  const [expanded, setExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      await agent.Todos.delete(id);
      deleteTodo(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async () => {
    const updatedTodo = await agent.Todos.edit(id, {
      completed: isCompleted ? false : true,
    });
    setIsCompleted(!isCompleted);
    updateTodo(id, updatedTodo);
  };

  return (
    <Card
      onClick={handleExpandClick}
      sx={{ position: "relative", bgcolor: isCompleted ? "#7AE837" : "FFF" }}
    >
      {important && !expanded && !isCompleted && (
        <PriorityHighRounded
          sx={{
            position: "absolute",
            right: "20%",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 38,
            opacity: "30%",
            color: "red",
          }}
        />
      )}

      <CardHeader
        action={
          !expanded && (
            <IconButton aria-label="check" onClick={handleComplete}>
              {isCompleted ? <DoDisturbAltRounded /> : <CheckRounded />}
            </IconButton>
          )
        }
        title={title}
        titleTypographyProps={{ fontSize: 16 }}
        subheader={new Date(createdAt).toLocaleDateString()}
        subheaderTypographyProps={{ fontSize: 12 }}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {description && (
          <CardContent>
            <Typography paragraph sx={{ fontSize: 16 }}>
              {description}
            </Typography>
          </CardContent>
        )}
        <CardActions>
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton aria-label="check" onClick={handleComplete}>
              {isCompleted ? <DoDisturbAltRounded /> : <CheckRounded />}
            </IconButton>
            <IconButton aria-label="edit">
              <Link
                style={{ color: "inherit", fontSize: 0 }}
                to={`/edit/${id}`}
              >
                <EditRounded />
              </Link>
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteRounded />
            </IconButton>
          </Box>
        </CardActions>
      </Collapse>
    </Card>
  );
};

export default TodoCard;
