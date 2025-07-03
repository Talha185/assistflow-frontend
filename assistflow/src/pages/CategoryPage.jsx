import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionnairePreview from '../components/QuestionnairePreview';

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
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
        if (data) setCategory(data);
      });
  }, [id]);

  if (notFound) return <div style={{ padding: 32 }}>Category not found.</div>;
  if (!category) return <div style={{ padding: 32 }}>Loading...</div>;

  return (
    <div style={{ padding: 32 }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: 24, marginRight: 16 }}>&larr; Back</button>
      <button onClick={() => navigate(`/edit-category/${category._id}`)} style={{ marginBottom: 24 }}>Edit</button>
      <h2 style={{ marginBottom: 16 }}>{category.name}</h2>
      <QuestionnairePreview rootQuestion={category.rootQuestion} />
    </div>
  );
} 