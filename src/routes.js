import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

const RoutesComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {/* إضافة مسارات أخرى هنا */}
    </Routes>
  </BrowserRouter>
);

export default RoutesComponent;