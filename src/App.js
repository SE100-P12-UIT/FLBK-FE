import { lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider} from '@mui/material';
import theme from './app/styles/muiOverride.js';
import Dashboard from  '../src/app/pages/Employee/Dashboard.js'
const Home = lazy(() => import('./app/pages/home/Home.js'))
const FlightSearch = lazy(() => import('./app/pages/search/FlightSearch.js'))
const BookFlight = lazy(() => import('./app/pages/search/BookFlight.js'))
 
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Dashboard" element={<Dashboard/>}></Route>
        <Route path="/Search" element={<FlightSearch />}></Route>
        <Route path="/Booking" element={<BookFlight />}></Route>
      </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
