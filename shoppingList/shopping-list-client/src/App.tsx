import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'jotai';
import theme from './theme';
import TopBar from './components/topBar';
import ShoppingList from './components/shoppingList';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ThemeProvider theme={theme}>
          <TopBar />
          <ShoppingList />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;