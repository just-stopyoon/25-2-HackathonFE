import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
    const popularTags = ['캠퍼스타운 공모전', '예비창업자 패키지', '중소기업 벤처사업부 기획'];

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', marginBottom: 'var(--spacing-xl)' }}>
            {/* Input Group */}
            <div style={{
                position: 'relative',
                marginBottom: 'var(--spacing-md)'
            }}>
                <input
                    type="text"
                    placeholder="인공지능을 활용한 공모전을 검색해보세요."
                    style={{
                        width: '100%',
                        padding: 'var(--spacing-lg) var(--spacing-xl)',
                        paddingLeft: '3.5rem',
                        fontSize: '1.25rem',
                        border: 'none',
                        borderBottom: '3px solid var(--primary)',
                        backgroundColor: 'transparent',
                        outline: 'none',
                        color: 'var(--text-main)',
                        fontFamily: 'inherit'
                    }}
                />
                <Search
                    size={32}
                    color="var(--primary)"
                    style={{
                        position: 'absolute',
                        left: '0.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                />
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                {popularTags.map((tag, idx) => (
                    <button key={idx} style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color var(--transition-fast)'
                    }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#c7d2fe'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary-light)'}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
