import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { path } = usePath();
  const showChatList = path === "/" || path.includes("chats");

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>
            {showChatList ? (
              <Box
                display="grid"
                gridTemplateColumns={{
                  xs: "1fr",
                  md: "5fr 7fr",
                  lg: "4fr 8fr",
                  xl: "3fr 9fr",
                }}
                gap={5}
              >
                <Box>
                  <ChatList />
                </Box>
                <Box>
                  <Routes />
                </Box>
              </Box>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default App;
