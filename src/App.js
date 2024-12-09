import { lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider} from '@mui/material';
import theme from './app/styles/muiOverride.js';
const Home = lazy(() => import('./app/pages/home/Home.js'))
 
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
