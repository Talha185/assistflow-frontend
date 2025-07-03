import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionNode from '../components/QuestionNode';

export default function AddCategoryPage() {
  const [name, setName] = useState('');
  const [rootQuestion, setRootQuestion] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:4000/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, rootQuestion })
    });
    navigate('/');
  };

  return (
    <div style={{ padding: 32, maxWidth: 700, margin: '0 auto' }}>
      <button type="button" onClick={() => navigate('/')} style={{ marginBottom: 24 }}>&larr; Back</button>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Category name"
          required
          style={{ width: '100%', marginBottom: 16 }}
        />
        <div style={{ marginBottom: 16 }}>
          <h4>Root Question</h4>
          {rootQuestion ? (
            <QuestionNode
              question={rootQuestion}
              onChange={setRootQuestion}
              onDelete={() => setRootQuestion(null)}
              isRoot={true}
            />
          ) : (
            <button type="button" onClick={() => setRootQuestion({ id: Date.now().toString(), text: '', options: [] })}>
              Add Root Question
            </button>
          )}
        </div>
        <button type="submit" style={{ width: '100%', marginTop: 16 }}>Register Category</button>
      </form>
    </div>
  );
} 