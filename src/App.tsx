import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from './components/header/Header';
import Admin from './pages/admin/Admin';
import Cart from './pages/cart/Cart';
import Favorite from './pages/favorite/Favorite';
import Home from './pages/home/Home';
import Product from './pages/product/Product';
import Products from './pages/products/Products';
import Profile from './pages/profile/Profile';
import { useAppDispatch } from './store/hooks';
import { fetchMe } from './store/slices/auth';
import { fetchBasket } from './store/slices/basket';
import { fetchBrands } from './store/slices/brands';
import { fetchFavorite } from './store/slices/favorite';
import { fetchTypes } from './store/slices/types';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchMe())
    dispatch(fetchBrands())
    dispatch(fetchTypes())
    dispatch(fetchBasket())
    dispatch(fetchFavorite())
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products/*' element={<Products />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/favorite' element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;