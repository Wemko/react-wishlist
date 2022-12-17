import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import WishlistPage from './pages/WishlistPage/WishlistPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/wishlist' element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
