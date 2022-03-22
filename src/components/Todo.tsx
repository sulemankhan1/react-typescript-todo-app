import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import TodosItems from "./TodosItems";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import { TodoType } from "../types/Todos";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    background: theme.palette.primary.main,
  },
  todo: {
    width: "40vw",
    backgroundColor: "red",
    [theme.breakpoints.down("lg")]: {
      width: "90vw",
    },
  },
}));

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 50,
  p: 4,
};

const Todo = (props: any) => {
  const [todos, setTodos] = React.useState<TodoType[]>([
    {
      id: Math.log2(Date.now()) + Math.random(),
      text: "This is an item",
      isDone: false,
    },
    {
      id: Math.log2(Date.now()) + Math.random(),
      text: "This is another item",
      isDone: true,
    },
    {
      id: Math.log2(Date.now()) + Math.random(),
      text: "This is Something else",
      isDone: false,
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");
  const [editItem, setEditItem] = React.useState<TodoType>();
  const classes = useStyles(props);

  const saveTodo = () => {
    if (editItem) {
      // update
      setTodos([...todos.filter((r) => r.id !== editItem.id), editItem]);
      setEditItem(undefined);
      setOpen(false);
    } else {
      // Add
      setTodos([
        ...todos,
        {
          id: Math.log2(Date.now()) + Math.random(),
          text: todoText,
          isDone: false,
        },
      ]);
      setTodoText("");
      setOpen(false);
    }
  };

  const handleAdd = () => {
    setOpen(true);
    setEditItem(undefined);
  };

  const handleEdit = (id: number) => {
    // show the modal
    setOpen(true);

    // get the edit todo
    const searched = todos.filter((r) => r.id === id);

    // set the edit todo as text
    setEditItem(searched[0]);
  };

  const handleDelete = (id: number) => {
    setTodos([...todos.filter((t) => t.id !== id)]);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        className={classes.root}
        justifyContent="center"
        p={10}
      >
        <Grid item>
          <Grid container spacing={2}>
            <Card className={classes.todo}>
              <CardContent>
                <Grid item>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h3" gutterBottom>
                        Todo App
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="medium"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                      >
                        Add New Item
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item>
                  <TodosItems
                    todos={todos}
                    setTodos={setTodos}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editItem ? "Update " : "Add New "} Item
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid
              container
              direction="column"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label={`${editItem ? "Update " : "Add New "}  Item`}
                  variant="outlined"
                  value={editItem ? editItem.text : todoText}
                  onChange={(e) => {
                    if (editItem) {
                      setEditItem({ ...editItem, text: e.target.value });
                    } else {
                      setTodoText(e.target.value);
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={saveTodo}>
                  <CheckIcon /> Save
                </Button>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Todo;
