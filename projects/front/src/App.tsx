import { ThemeProvider, createTheme } from '@mui/material/styles';
import MainPage from './page/main/MainPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const mainStyle = {
  width: '100vw',
  height: '100vh',
  background: 'black',
  position: 'fixed',
  top: 0,
  left: 0
} as React.CSSProperties;

const App = () => (
  <ThemeProvider theme={darkTheme}>
      <main style={mainStyle}>
        <MainPage />
      </main>
  </ThemeProvider>
);

export default App;
