import React from 'react';

const FormSection = ({ title, id, children }) => {
    return (
        <section id={id} style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--primary)',
                marginBottom: 'var(--spacing-lg)',
                paddingBottom: 'var(--spacing-sm)',
                borderBottom: '2px solid var(--primary-light)'
            }}>
                {title}
            </h2>
            <div style={{
                backgroundColor: 'transparent',
            }}>
                {children}
            </div>
        </section>
    );
};

export default FormSection;
