import React from 'react';
import { Menu, CheckCircle, Circle, FolderOpen, Target, Lightbulb, TrendingUp, Users } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionClick, menuItems = [] }) => {

    return (
        <aside style={{
            width: '260px',
            backgroundColor: 'white',
            height: 'calc(100vh - 96px)',
            position: 'fixed',
            left: '16px',
            top: '80px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10
        }}>
            {/* Logo Area */}
            <div style={{
                padding: 'var(--spacing-xl) var(--spacing-lg)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'var(--primary)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                }}>M</div>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>MINDI</span>
            </div>

            {/* Menu Items */}
            <nav style={{ flex: 1, padding: 'var(--spacing-md)', overflowY: 'auto' }}>
                <ul style={{ listStyle: 'none' }}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeSection));
                        const isExpanded = isActive; // Expand if active

                        return (
                            <li key={item.id} style={{ marginBottom: 'var(--spacing-xs)' }}>
                                <div
                                    onClick={() => onSectionClick(item.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
                                        backgroundColor: isActive && !item.subItems ? 'var(--primary-light)' : 'transparent',
                                        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-fast)',
                                    }}
                                >
                                    {Icon && <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />}
                                    <span style={{
                                        fontWeight: isActive ? '600' : '500',
                                        fontSize: '0.95rem'
                                    }}>
                                        {item.label}
                                    </span>
                                </div>

                                {isExpanded && item.subItems && (
                                    <ul style={{
                                        listStyle: 'none',
                                        paddingLeft: '3rem',
                                        marginTop: '4px',
                                        borderLeft: '2px solid var(--border)',
                                        marginLeft: '1.4rem'
                                    }}>
                                        {item.subItems.map((subItem) => {
                                            const isSubActive = activeSection === subItem.id;
                                            return (
                                                <li key={subItem.id} style={{ marginBottom: '8px' }}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onSectionClick(subItem.id);
                                                        }}
                                                        style={{
                                                            fontSize: '0.85rem',
                                                            color: isSubActive ? 'var(--primary)' : 'var(--text-muted)',
                                                            fontWeight: isSubActive ? '600' : '400',
                                                            textAlign: 'left',
                                                            padding: '4px 0',
                                                            width: '100%'
                                                        }}
                                                    >
                                                        {subItem.label}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer / Status Area */}
            <div style={{ padding: 'var(--spacing-md)', borderTop: '1px solid var(--border)' }}>
                <div style={{
                    padding: 'var(--spacing-md)',
                    backgroundColor: 'var(--background)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                }}>
                    <p style={{ fontWeight: '600', marginBottom: 'var(--spacing-xs)', color: 'var(--text-main)' }}>
                        작성 진행률
                    </p>
                    <div style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: 'var(--border)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '15%',
                            height: '100%',
                            backgroundColor: 'var(--success)',
                            borderRadius: 'var(--radius-full)'
                        }} />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
