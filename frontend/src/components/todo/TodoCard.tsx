import React, { useState } from "react";
import { CheckRounded, DeleteRounded, EditRounded } from "@mui/icons-material";
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

interface Props {
  title: string;
  createdAt: string;
  description: string;
  important?: boolean;
}

const TodoCard = ({ createdAt, description, important, title }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card onClick={handleExpandClick}>
      <CardHeader
        action={
          <IconButton aria-label="check">
            <CheckRounded />
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ fontSize: 16 }}
        subheader={createdAt}
        subheaderTypographyProps={{ fontSize: 12 }}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph sx={{ fontSize: 16 }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="delete">
            <DeleteRounded />
          </IconButton>
          <IconButton aria-label="edit">
            <Link to="/edit">
              <EditRounded />
            </Link>
          </IconButton>
        </CardActions>
      </Collapse>
    </Card>
  );
};

export default TodoCard;
