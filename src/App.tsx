import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import AppRouter from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;