import React from 'react';
import { Routes, Route } from "react-router-dom";
import Readme from './readme';
import Author from './author';

export default () => {
    return (
        <Routes>
            <Route path='/' element={<Readme />} />
            <Route path='/author' element={<Author />} />
            <Route path='*' element={<div>404 not found</div>} />
        </Routes>
    );
};