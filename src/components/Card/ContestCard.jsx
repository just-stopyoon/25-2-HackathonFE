import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

const ContestCard = ({ id, title, organization, dueDate, categories, image }) => {
    const navigate = useNavigate();
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)',
            transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}
            onClick={() => navigate(`/competitions/${id}`)}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
        >
            {/* Image Section */}
            <div style={{
                height: '180px',
                backgroundColor: '#e2e8f0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {image ? (
                    <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                        No Image
                    </div>
                )}
                {/* Star Icon Overlay (Mock) */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    color: 'white',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '50%',
                    padding: '4px'
                }}>
                    <span style={{ fontSize: '1.2rem' }}>★</span>
                </div>
            </div>

            {/* Content Section */}
            <div style={{ padding: 'var(--spacing-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    fontWeight: '600',
                    marginBottom: 'var(--spacing-xs)'
                }}>
                    {organization}
                </div>

                <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    lineHeight: '1.4',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--text-main)',
                    flex: 1
                }}>
                    {title}
                </h3>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    marginBottom: 'var(--spacing-md)'
                }}>
                    <Calendar size={16} />
                    <span>서류 마감 ~ {dueDate}</span>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
                    {categories.map((cat, index) => (
                        <span key={index} style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: 'var(--primary)',
                            backgroundColor: 'var(--primary-light)',
                            padding: '4px 8px',
                            borderRadius: 'var(--radius-sm)'
                        }}>
                            {cat}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContestCard;
