import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Place your logo as logo.png in src/assets/

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav style={{
      width: '100vw',
      background: 'var(--color-bg-light)',
      color: '#fff',
      padding: '0.5rem 2rem',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(36,49,66,0.08)',
      minHeight: 64,
      zIndex: 100,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/') }>
        <img
          src={logo}
          alt="Rippleberry Logo"
          style={{ height: 40, width: 80, objectFit: 'contain', marginRight: 16 }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <span style={{ fontFamily: 'var(--font-bold)', fontWeight: 700, fontSize: 28, letterSpacing: 1, color: 'var(--color-primary)' }}>
          RippleBerry Tech
        </span>
      </div>
    </nav>
  );
} 