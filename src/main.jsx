import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContext.jsx";
// import UserContextProvider from "./context/UserContext.jsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          {/* <UserContextProvider> */}
          <ToastContainer position="top-right" autoClose={5000} />
          <App />
          {/* </UserContextProvider> */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
