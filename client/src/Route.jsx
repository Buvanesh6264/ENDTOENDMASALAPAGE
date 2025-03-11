import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Homepage from './pages/Homepage.jsx';
import Prroducts from './pages/Prroducts.jsx';
import Recipes from './pages/Recipes.jsx';
import Contact from './pages/Contact.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import About from './pages/Aboutus.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import OrderPage from './pages/Order.jsx';
import OrderConfirmation from './pages/Ordercomfm.jsx';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/aboutus" element={< About/>} />
            <Route path="/products" element={<Prroducts />} />
            <Route path="/recipes" element={< Recipes/>} />
            <Route path="/shop" element={< Shop/>} />
            <Route path="/contactus" element={< Contact/>} />
            <Route path="/cart" element={< Cart/>} />
            <Route path="/order" element={< OrderPage/>} />
            <Route path="/placed" element={< OrderConfirmation/>} />
            <Route path="/login" element={< Login/>} />
            <Route path="/register" element={< Signup/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
