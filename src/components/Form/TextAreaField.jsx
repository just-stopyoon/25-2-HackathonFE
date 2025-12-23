import React from 'react';
import { Lightbulb } from 'lucide-react';

const TextAreaField = ({ label, placeholder, helpText, minHeight = "120px" }) => {
    return (
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 'var(--spacing-sm)'
            }}>
                <label style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--text-main)',
                }}>
                    {label}
                </label>
                {helpText && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        color: 'var(--warning-text)',
                        backgroundColor: 'var(--warning-bg)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)'
                    }}>
                        <Lightbulb size={12} />
                        <span>{helpText}</span>
                    </div>
                )}
            </div>

            <textarea
                placeholder={placeholder}
                style={{
                    width: '100%',
                    minHeight: minHeight,
                    padding: 'var(--spacing-md)',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    color: 'var(--text-main)',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                    fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px var(--primary-light)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.boxShadow = 'none';
                }}
            />
        </div>
    );
};

export default TextAreaField;
