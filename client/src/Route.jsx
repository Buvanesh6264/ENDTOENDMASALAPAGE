import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Homepage from './pages/Homepage.jsx';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
