// import { Inter } from '@next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LayoutContainer, WebHeader } from '@Layouts';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './HomePage';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}
