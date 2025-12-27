import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './app/lib/queryClient';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './app/contexts/AuthContext';
import { ThemeProvider } from './app/contexts/ThemeContext';
import Router from './Router';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthContextProvider>
          <Router />

          <Toaster />
        </AuthContextProvider>

        <ReactQueryDevtools position='bottom' buttonPosition='bottom-left' />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
