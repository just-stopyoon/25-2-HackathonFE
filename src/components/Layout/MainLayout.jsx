import React from 'react';
import Sidebar from '../Navigation/Sidebar';

import Footer from './Footer';
import Header from './Header';

const MainLayout = ({ children, activeSection, onSectionClick }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
            <Sidebar activeSection={activeSection} onSectionClick={onSectionClick} />
            <main style={{
                flex: 1,
                marginLeft: '280px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Header />
                <div style={{
                    padding: 'var(--spacing-xl)',
                    maxWidth: '1200px',
                    width: '100%',
                    margin: '0 auto'
                }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {children}
                    </div>
                    <div style={{ marginTop: 'auto' }}>
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
