import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: 32 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Complaint Categories</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
        {categories.map(cat => (
          <div
            key={cat._id}
            className="card"
            style={{ minWidth: 220, minHeight: 100, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontFamily: 'var(--font-bold)' }}
            onClick={() => navigate(`/category/${cat._id}`)}
          >
            {cat.name}
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/add-category')}
        style={{
          position: 'fixed',
          top: 120,
          right: 48,
          width: 64,
          height: 64,
          borderRadius: '50%',
          fontSize: 40,
          background: 'var(--color-primary)',
          color: '#fff',
          boxShadow: '0 4px 16px rgba(161,85,249,0.15)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-bold)',
        }}
        aria-label="Add Category"
      >
        +
      </button>
    </div>
  );
} 