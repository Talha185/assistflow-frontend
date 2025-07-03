import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import AddCategoryPage from './pages/AddCategoryPage';
import EditCategoryPage from './pages/EditCategoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/add-category" element={<AddCategoryPage />} />
        <Route path="/edit-category/:id" element={<EditCategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
