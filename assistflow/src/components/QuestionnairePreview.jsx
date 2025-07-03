import React, { useState } from 'react';

function traverse(question, path, onEnd) {
  if (!question) return null;
  return (
    <QuestionStep
      key={question.id}
      question={question}
      path={path}
      onEnd={onEnd}
    />
  );
}

function QuestionStep({ question, path, onEnd }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = idx => {
    setSelected(idx);
    const option = question.options[idx];
    if (option.nextQuestion) {
      // Continue to next question
    } else {
      // End of path
      onEnd([...path, { question: question.text, answer: option.text }]);
    }
  };

  if (selected !== null && question.options[selected].nextQuestion) {
    return traverse(
      question.options[selected].nextQuestion,
      [...path, { question: question.text, answer: question.options[selected].text }],
      onEnd
    );
  }

  return (
    <div style={{ marginTop: 16, marginBottom: 8 }}>
      <div style={{ fontFamily: 'var(--font-bold)', color: 'var(--color-primary)', fontSize: 18, marginBottom: 8 }}>{question.text}</div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {question.options.map((opt, idx) => (
          <button
            key={opt.id}
            style={{
              marginBottom: 8,
              background: selected === idx ? 'var(--color-primary)' : '#fff',
              color: selected === idx ? '#fff' : 'var(--color-dark)',
              border: selected === idx ? '2px solid var(--color-primary)' : '1.5px solid #e0e0e0',
              fontFamily: 'var(--font-bold)',
              minWidth: 120,
              boxShadow: selected === idx ? '0 2px 8px rgba(161,85,249,0.10)' : '0 1px 4px rgba(36,49,66,0.04)',
              transition: 'all 0.2s',
            }}
            onClick={() => handleSelect(idx)}
            disabled={selected !== null}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function QuestionnairePreview({ rootQuestion }) {
  const [answerPath, setAnswerPath] = useState(null);

  const handleEnd = path => {
    setAnswerPath(path);
    // Log to console as well
    console.log('Answer path:', path);
  };

  const handleRestart = () => setAnswerPath(null);

  if (!rootQuestion) return <div style={{ color: '#bdbdbd', fontFamily: 'var(--font-light)', marginTop: 24 }}>No questionnaire defined for this category.</div>;

  return (
    <div className="card" style={{ marginTop: 24, border: '1.5px solid var(--color-primary)', borderRadius: 14, padding: 24, background: '#f7f7fa', color: 'var(--color-dark)' }}>
      <h4 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-bold)', marginTop: 0 }}>Questionnaire Preview</h4>
      {answerPath ? (
        <div>
          <div style={{ fontFamily: 'var(--font-bold)', color: 'var(--color-secondary)', marginBottom: 8 }}>Selected Path:</div>
          <ol style={{ paddingLeft: 20, marginBottom: 16 }}>
            {answerPath.map((step, idx) => (
              <li key={idx} style={{ fontFamily: 'var(--font-regular)', fontSize: 16, marginBottom: 4 }}>
                <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{step.question}</span>: {step.answer}
              </li>
            ))}
          </ol>
          <button onClick={handleRestart} style={{ background: 'var(--color-primary)', color: '#fff', fontFamily: 'var(--font-bold)' }}>Restart Preview</button>
        </div>
      ) : (
        traverse(rootQuestion, [], handleEnd)
      )}
    </div>
  );
} 