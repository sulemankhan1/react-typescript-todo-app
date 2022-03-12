import React from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    background: theme.palette.primary.main,
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
        <Card>
          <CardContent>
            <Grid container spacing={2} className={classes.todo}>
              <Grid item>
                <Typography variant="h2">Todo App</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Todo;
