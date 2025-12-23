import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header style={{
            padding: 'var(--spacing-md) var(--spacing-xl)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            width: '100%'
        }}>
            <div
                onClick={() => navigate('/recommendations')}
                style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.5rem', cursor: 'pointer' }}
            >
                BIZSTEP
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-lg)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span style={{ cursor: 'pointer' }}>로그아웃</span>
                <span style={{ cursor: 'pointer' }}>마이 페이지</span>
            </div>
        </header>
    );
};

export default Header;
