import React, { useState } from 'react';
import { Menu, CheckCircle, Circle, FolderOpen, Target, Lightbulb, TrendingUp, Users } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionClick }) => {
    const menuItems = [
        { id: 'service-core', label: '서비스 핵심 정보', icon: FolderOpen },
        { id: 'problem-customer', label: '문제 인식 & 고객 정의', icon: Target },
        { id: 'feasibility', label: '개요 & 실현 가능성', icon: Lightbulb },
        { id: 'growth-strategy', label: '성장 전략 & 사업화', icon: TrendingUp },
        { id: 'team', label: '팀 구성 & 역할', icon: Users },
    ];

    return (
        <aside style={{
            width: '280px',
            backgroundColor: 'white',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            borderRight: '1px solid var(--border)',
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
                        const isActive = activeSection === item.id;

                        return (
                            <li key={item.id} style={{ marginBottom: 'var(--spacing-xs)' }}>
                                <button
                                    onClick={() => onSectionClick(item.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
                                        backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                                        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                        transition: 'all var(--transition-fast)',
                                        textAlign: 'left'
                                    }}
                                >
                                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span style={{
                                        fontWeight: isActive ? '600' : '500',
                                        fontSize: '0.95rem'
                                    }}>
                                        {item.label}
                                    </span>
                                    {isActive && <div style={{
                                        marginLeft: 'auto',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--primary)'
                                    }} />}
                                </button>
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
