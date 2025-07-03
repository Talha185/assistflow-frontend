import React from 'react';

export default function CategoryCard({ category, onDelete, onEditRootQuestion, children }) {
  return (
    <div className="card" style={{ marginTop: 0, marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>{category.name}</h3>
        <button onClick={() => onDelete(category.id)} style={{ background: 'var(--color-secondary)', color: 'var(--color-dark)', fontFamily: 'var(--font-bold)' }}>Delete</button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
} 