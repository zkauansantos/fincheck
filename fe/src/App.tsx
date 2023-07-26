import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/lib/queryClient";

import Router from "./Router";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./app/contexts/AuthContext";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router />

        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
