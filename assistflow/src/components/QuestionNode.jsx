import React, { useState } from 'react';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function isTextInputNode(node) {
  return node && node.type === 'textInput';
}

export default function QuestionNode({
  question,
  onChange,
  onDelete,
  isRoot,
  depth = 0,
  activePath = [],
  setActivePath = () => {},
  parentActivePath = [],
}) {
  const [questionText, setQuestionText] = useState(question?.text || '');
  const [newOption, setNewOption] = useState('');

  // Is this node expanded?
  const expanded = activePath.length === 0;

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

  // Handler for expanding a child node
  const handleExpandChild = idx => {
    setActivePath([idx]);
  };

  // Handler for passing activePath to child
  const getChildActivePath = idx => {
    if (activePath.length > 0 && activePath[0] === idx) {
      return activePath.slice(1);
    }
    return [];
  };

  // Handler for passing parentActivePath to child
  const getChildParentActivePath = idx => {
    return [...parentActivePath, idx];
  };

  // Visual indicator for nesting
  const bar = (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 6,
        background: depth > 0 ? 'var(--color-primary)' : 'transparent',
        borderRadius: 3,
        opacity: 0.18,
        marginLeft: -18,
        zIndex: 0,
      }}
    />
  );

  // Add Text Input as nextQuestion
  const handleAddTextInput = idx => {
    handleOptionNextQuestionChange(idx, { type: 'textInput', id: generateId(), label: '' });
    setActivePath([idx]);
  };

  // Edit label for text input node
  const handleTextInputLabelChange = (idx, label) => {
    const updated = {
      ...question,
      options: question.options.map((opt, i) =>
        i === idx ? { ...opt, nextQuestion: { ...opt.nextQuestion, label } } : opt
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
      background: '#f7f7fa',
      boxShadow: '0 2px 12px rgba(161,85,249,0.04)',
      fontFamily: 'var(--font-regular)',
      transition: 'box-shadow 0.2s',
      position: 'relative',
      width: '100%',
      display: 'block',
      marginLeft: depth > 0 ? 18 : 0,
      minHeight: 60,
    }}>
      {bar}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, zIndex: 1, position: 'relative' }}>
        <input
          value={questionText}
          onChange={handleQuestionTextChange}
          placeholder="Question text"
          style={{ flex: 1, fontFamily: 'var(--font-bold)', fontSize: 18, background: '#fff', color: 'var(--color-dark)' }}
          readOnly={activePath.length !== 0}
        />
        {!isRoot && activePath.length === 0 && (
          <button type="button" onClick={onDelete} style={{ background: '#fff', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', fontFamily: 'var(--font-bold)' }}>Delete Question</button>
        )}
      </div>
      {activePath.length === 0 ? (
        <div style={{ marginTop: 16 }}>
          <strong style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-bold)' }}>Options:</strong>
          {(question.options || []).map((opt, idx) => (
            <div key={opt.id}>
              <div style={{ marginTop: 12, marginLeft: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  value={opt.text}
                  onChange={e => handleOptionTextChange(idx, e.target.value)}
                  placeholder="Option text"
                  style={{ marginRight: 8, fontFamily: 'var(--font-regular)', background: '#fff', color: 'var(--color-dark)' }}
                  readOnly={!!opt.nextQuestion}
                />
                {activePath.length === 0 && (
                  <button type="button" onClick={() => handleDeleteOption(idx)} style={{ background: '#fff', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', fontFamily: 'var(--font-bold)' }}>Delete Option</button>
                )}
                <span style={{ marginRight: 8, color: '#bdbdbd' }}>|</span>
                <span style={{ fontSize: 13, color: 'var(--color-dark)' }}>Nested:</span>
                {!opt.nextQuestion && activePath.length === 0 && (
                  <>
                    <button type="button" onClick={() => handleOptionNextQuestionChange(idx, { id: generateId(), text: '', options: [] })} style={{ marginLeft: 8, background: 'var(--color-secondary)', color: 'var(--color-dark)', fontFamily: 'var(--font-bold)' }}>
                      Add Nested Question
                    </button>
                    <button type="button" onClick={() => handleAddTextInput(idx)} style={{ marginLeft: 4, background: '#fff', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', fontFamily: 'var(--font-bold)' }}>
                      Add Text Input
                    </button>
                  </>
                )}
                {isTextInputNode(opt.nextQuestion) && (
                  <span style={{ marginLeft: 8, color: 'var(--color-primary)', fontStyle: 'italic', fontSize: 14 }}>
                    [Text Input]
                  </span>
                )}
                {opt.nextQuestion && !isTextInputNode(opt.nextQuestion) && (
                  <button type="button" onClick={() => handleExpandChild(idx)} style={{ marginLeft: 8, background: 'transparent', color: 'var(--color-primary)', fontFamily: 'var(--font-bold)', border: 'none', fontSize: 18 }}>
                    {/* No icon, just triggers expansion */}
                  </button>
                )}
              </div>
              {isTextInputNode(opt.nextQuestion) && activePath.length === 0 && (
                <div style={{ marginTop: 12, width: '100%' }}>
                  <input
                    value={opt.nextQuestion.label}
                    onChange={e => handleTextInputLabelChange(idx, e.target.value)}
                    placeholder="Text input label"
                    style={{ width: '100%', fontFamily: 'var(--font-regular)', background: '#fff', color: 'var(--color-dark)', padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
                  />
                </div>
              )}
              {opt.nextQuestion && !isTextInputNode(opt.nextQuestion) && (
                <div style={{ marginTop: 12, width: '100%' }}>
                  <QuestionNode
                    question={opt.nextQuestion}
                    onChange={q => handleOptionNextQuestionChange(idx, q)}
                    onDelete={() => handleOptionNextQuestionChange(idx, null)}
                    isRoot={false}
                    depth={depth + 1}
                    activePath={getChildActivePath(idx)}
                    setActivePath={path => setActivePath([idx, ...path])}
                    parentActivePath={getChildParentActivePath(idx)}
                  />
                </div>
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
      ) : (
        <div style={{ marginTop: 16 }}>
          <strong style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-bold)' }}>Options:</strong>
          {(question.options || []).map((opt, idx) => (
            <div key={opt.id} style={{ marginTop: 12, marginLeft: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                value={opt.text}
                readOnly
                placeholder="Option text"
                style={{ marginRight: 8, fontFamily: 'var(--font-regular)', background: '#fff', color: 'var(--color-dark)' }}
              />
              <span style={{ marginRight: 8, color: '#bdbdbd' }}>|</span>
              <span style={{ fontSize: 13, color: 'var(--color-dark)' }}>Nested:</span>
              {isTextInputNode(opt.nextQuestion) && (
                <span style={{ marginLeft: 8, color: 'var(--color-primary)', fontStyle: 'italic', fontSize: 14 }}>
                  [Text Input: {opt.nextQuestion.label || '...'}]
                </span>
              )}
              {opt.nextQuestion && !isTextInputNode(opt.nextQuestion) && (
                <button type="button" onClick={() => handleExpandChild(idx)} style={{ marginLeft: 8, background: 'transparent', color: 'var(--color-primary)', fontFamily: 'var(--font-bold)', border: 'none', fontSize: 18 }}>
                  {/* No icon, just triggers expansion */}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 