import React from "react";

import { ThemeProvider } from "@mui/styles";
import theme from "./theme";
import Todo from "./components/Todo";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Todo />
    </ThemeProvider>
  );
};

export default App;
