import React from 'react';
import { Routes, Route } from "react-router-dom";
import Readme from './readme';
import S3Page from './examples/s3/page';

export default () => {
    return (
        <Routes>
            <Route path='/' element={<Readme />} />
            <Route path='/examples/s3' element={<S3Page />} />
            <Route path='*' element={<div>404 not found</div>} />
        </Routes>
    );
};