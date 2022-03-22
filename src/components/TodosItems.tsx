import React from "react";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { TodoType } from "../types/Todos";

interface Props {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodosItems: React.FC<Props> = ({ todos, setTodos, onEdit, onDelete }) => {
  const handleToggle = (id: number) => () => {
    const todoItems = todos.map((t) => {
      if (t.id === id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    setTodos(todoItems);
  };

  return (
    <>
      <List>
        {todos.length === 0 && (
          <Grid container mt={2}>
            <Typography variant="h5" gutterBottom>
              No Todos Found. Add one!
            </Typography>
          </Grid>
        )}
        {todos.map((todo) => {
          const labelId = `checkbox-list-label-${todo.id}`;

          return (
            <ListItem
              key={todo.id}
              secondaryAction={
                <>
                  <Button
                    size="medium"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={(e) => onEdit(todo.id)}
                  >
                    Edit
                  </Button>
                  {/* <Button
                    size="medium"
                    color="secondary"
                    startIcon={<CheckIcon />}
                  >
                    Mark Completed
                  </Button> */}
                  <Button
                    size="medium"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={(e) => onDelete(todo.id)}
                  >
                    Delete
                  </Button>
                </>
              }
              disablePadding
            >
              <ListItemButton
                disableRipple
                role={undefined}
                onClick={handleToggle(todo.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    color="secondary"
                    checked={todo.isDone}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId}>
                  <Typography
                    variant="body1"
                    style={{
                      textDecoration: todo.isDone ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default TodosItems;
