import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/lib/queryClient";

import Router from "./Router";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./app/contexts/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router />

        <Toaster />
      </AuthContextProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
