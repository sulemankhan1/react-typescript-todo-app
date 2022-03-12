import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import TodosItems from "./TodosItems";

import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    background: theme.palette.primary.main,
  },
  todo: {
    width: "50vw",
    backgroundColor: "red",
    [theme.breakpoints.down("lg")]: {
      width: "90vw",
    },
  },
}));

const Todo = (props: any) => {
  const classes = useStyles(props);

  return (
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
                    <Typography variant="h3">Todo App</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="medium"
                      color="secondary"
                      startIcon={<AddIcon />}
                    >
                      Add New Item
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid item>
                <TodosItems />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Todo;
