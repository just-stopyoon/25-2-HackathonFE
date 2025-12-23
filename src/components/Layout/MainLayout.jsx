import React from 'react';
import Sidebar from '../Navigation/Sidebar';
import Footer from './Footer';

const MainLayout = ({ children, activeSection, onSectionClick }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
            <Sidebar activeSection={activeSection} onSectionClick={onSectionClick} />
            <main style={{
                flex: 1,
                marginLeft: '280px',
                padding: 'var(--spacing-xl)',
                maxWidth: '1200px', /* Limit content width for readability */
                width: '100%'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {children}
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
