import React, { useState } from 'react';

export default function CategoryList({ categories, onAddCategory, onSelectCategory, selectedCategoryId }) {
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="card" style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: 'var(--font-bold)', color: 'var(--color-primary)' }}>Categories</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            style={{
              border: cat.id === selectedCategoryId ? '2.5px solid var(--color-primary)' : '1.5px solid #e0e0e0',
              borderRadius: 12,
              padding: '18px 28px',
              minWidth: 180,
              minHeight: 60,
              cursor: 'pointer',
              background: cat.id === selectedCategoryId ? 'var(--color-primary)' : '#f7f7fa',
              color: cat.id === selectedCategoryId ? '#fff' : 'var(--color-dark)',
              fontFamily: 'var(--font-bold)',
              fontSize: 18,
              boxShadow: cat.id === selectedCategoryId ? '0 4px 16px rgba(161,85,249,0.10)' : '0 2px 8px rgba(36,49,66,0.04)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.name}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="New category name"
          style={{ flex: 1, maxWidth: 240 }}
        />
        <button onClick={handleAdd} style={{ minWidth: 120 }}>Add Category</button>
      </div>
    </div>
  );
} 