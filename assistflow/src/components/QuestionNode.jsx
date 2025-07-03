import React, { useState } from 'react';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function QuestionNode({ question, onChange, onDelete, isRoot }) {
  const [questionText, setQuestionText] = useState(question?.text || '');
  const [newOption, setNewOption] = useState('');

  const handleQuestionTextChange = e => {
    setQuestionText(e.target.value);
    onChange({ ...question, text: e.target.value });
  };

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    const updated = {
      ...question,
      options: [
        ...(question.options || []),
        { id: generateId(), text: newOption.trim(), nextQuestion: null }
      ]
    };
    setNewOption('');
    onChange(updated);
  };

  const handleOptionTextChange = (idx, text) => {
    const updated = {
      ...question,
      options: question.options.map((opt, i) =>
        i === idx ? { ...opt, text } : opt
      )
    };
    onChange(updated);
  };

  const handleDeleteOption = idx => {
    const updated = {
      ...question,
      options: question.options.filter((_, i) => i !== idx)
    };
    onChange(updated);
  };

  const handleOptionNextQuestionChange = (idx, nextQuestion) => {
    const updated = {
      ...question,
      options: question.options.map((opt, i) =>
        i === idx ? { ...opt, nextQuestion } : opt
      )
    };
    onChange(updated);
  };

  return (
    <div style={{
      border: '1.5px solid var(--color-primary)',
      borderRadius: 14,
      padding: 24,
      marginTop: 24,
      marginLeft: isRoot ? 0 : 32,
      background: '#f7f7fa',
      boxShadow: '0 2px 12px rgba(161,85,249,0.04)',
      fontFamily: 'var(--font-regular)',
      transition: 'box-shadow 0.2s',
      position: 'relative',
      width: '100%',
      display: 'block',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <input
          value={questionText}
          onChange={handleQuestionTextChange}
          placeholder="Question text"
          style={{ flex: 1, fontFamily: 'var(--font-bold)', fontSize: 18, background: '#fff', color: 'var(--color-dark)' }}
        />
        {!isRoot && (
          <button type="button" onClick={onDelete} style={{ background: '#fff', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', fontFamily: 'var(--font-bold)' }}>Delete Question</button>
        )}
      </div>
      <div style={{ marginTop: 16 }}>
        <strong style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-bold)' }}>Options:</strong>
        {(question.options || []).map((opt, idx) => (
          <div key={opt.id} style={{ marginTop: 12, marginLeft: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              value={opt.text}
              onChange={e => handleOptionTextChange(idx, e.target.value)}
              placeholder="Option text"
              style={{ marginRight: 8, fontFamily: 'var(--font-regular)', background: '#fff', color: 'var(--color-dark)' }}
            />
            <button type="button" onClick={() => handleDeleteOption(idx)} style={{ background: '#fff', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', fontFamily: 'var(--font-bold)' }}>Delete Option</button>
            <span style={{ marginRight: 8, color: '#bdbdbd' }}>|</span>
            <span style={{ fontSize: 13, color: 'var(--color-dark)' }}>Nested Question:</span>
            {opt.nextQuestion ? (
              <QuestionNode
                question={opt.nextQuestion}
                onChange={q => handleOptionNextQuestionChange(idx, q)}
                onDelete={() => handleOptionNextQuestionChange(idx, null)}
                isRoot={false}
              />
            ) : (
              <button type="button" onClick={() => handleOptionNextQuestionChange(idx, { id: generateId(), text: '', options: [] })} style={{ marginLeft: 8, background: 'var(--color-secondary)', color: 'var(--color-dark)', fontFamily: 'var(--font-bold)' }}>
                Add Nested Question
              </button>
            )}
          </div>
        ))}
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <input
            value={newOption}
            onChange={e => setNewOption(e.target.value)}
            placeholder="New option text"
            style={{ flex: 1, fontFamily: 'var(--font-regular)', background: '#fff', color: 'var(--color-dark)' }}
          />
          <button type="button" onClick={handleAddOption} style={{ minWidth: 120 }}>Add Option</button>
        </div>
      </div>
    </div>
  );
} 