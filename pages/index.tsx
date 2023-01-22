// import { Inter } from '@next/font/google';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './HomePage';

let theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
theme = responsiveFontSizes(theme);

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}
