import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionNode from '../components/QuestionNode';

export default function EditCategoryPage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [rootQuestion, setRootQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/api/categories/${id}`)
      .then(res => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setName(data.name);
          setRootQuestion(data.rootQuestion);
          setLoading(false);
        }
      });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`http://localhost:4000/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, rootQuestion })
    });
    navigate(`/category/${id}`);
  };

  if (notFound) return <div style={{ padding: 32 }}>Category not found.</div>;
  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;

  return (
    <div style={{ padding: 32, maxWidth: 700, margin: '0 auto' }}>
      <button type="button" onClick={() => navigate(`/category/${id}`)} style={{ marginBottom: 24 }}>&larr; Back</button>
      <h2>Edit Category</h2>
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
        <button type="submit" style={{ width: '100%', marginTop: 16 }}>Save Changes</button>
      </form>
    </div>
  );
} 