import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { theme } from './shared/theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>
);
