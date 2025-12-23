import React from 'react';
import Sidebar from '../Navigation/Sidebar';

import Footer from './Footer';
import Header from './Header';

const MainLayout = ({ children, activeSection, onSectionClick, sidebarItems }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Sidebar activeSection={activeSection} onSectionClick={onSectionClick} menuItems={sidebarItems} />
            <main style={{
                marginLeft: '300px',
                paddingTop: '64px',
                width: 'auto',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    padding: 'var(--spacing-xl)',
                    maxWidth: '1200px',
                    width: '100%',
                    margin: '0 auto',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
