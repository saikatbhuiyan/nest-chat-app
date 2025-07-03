import {
  Container,
  CssBaseline,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import ChatList from "./components/chat-list/ChatList";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Box display="flex">
          <Box flex="0 0 25%" maxWidth="25%">
            <ChatList />
          </Box>
          <Box flex="1">
            <Container>
              <Guard>
                <RouterProvider router={router} />
              </Guard>
            </Container>
          </Box>
        </Box>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
