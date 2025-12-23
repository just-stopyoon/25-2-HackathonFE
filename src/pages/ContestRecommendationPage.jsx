import React from 'react';
import SearchBar from '../components/Search/SearchBar';
import ContestCard from '../components/Card/ContestCard';

// Header/Nav component specific to this page (or global later)
const Header = () => (
    <header style={{
        padding: 'var(--spacing-md) var(--spacing-xl)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    }}>
        <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.5rem' }}>BIZSTEP</div>
        <div style={{ display: 'flex', gap: 'var(--spacing-lg)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span>로그아웃</span>
            <span>마이 페이지</span>
        </div>
    </header>
);

const ContestRecommendationPage = () => {
    // Mock Data
    const contests = [
        {
            id: 1,
            title: '2025 입주기업 모집공고',
            organization: '세종대 캠퍼스타운',
            dueDate: '11/15 (금)',
            categories: ['캠퍼스타운', '창업 7년 미만'],
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Office/Startup bg
        },
        {
            id: 2,
            title: 'KU 스타트업 스케일업: KU IR CAMP',
            organization: '건국대 캠퍼스타운',
            dueDate: '07/08 (월)',
            categories: ['1:1 멘토링 진행', '서류만 심사'],
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Meeting/Business
        },
        {
            id: 3,
            title: '2025년 딥테크 챌린지 프로젝트',
            organization: '범부처 통합연구지원시스템',
            dueDate: '04/30 (목)',
            categories: ['R&D 산업', '서류 평가', '스케일업'],
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Tech/Computers
        }
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Header />

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--spacing-xl) var(--spacing-md)' }}>

                {/* Search Section */}
                <section style={{ marginTop: 'var(--spacing-xl)', marginBottom: '4rem' }}>
                    <SearchBar />
                </section>

                {/* Highlight/Notice (Toast-like) */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <div style={{
                        backgroundColor: '#1e293b',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem'
                    }}>
                        우리 서비스에 유리한 공모전을 확인해보세요.
                    </div>
                </div>

                {/* Hero Text */}
                <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.3', color: 'var(--primary)' }}>
                        <span style={{ color: 'var(--primary)' }}>인공지능 활용 기술</span> <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>▼</span> 을 활용한 <br />
                        <span style={{ color: 'var(--primary)' }}>세종대학교</span> <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>▼</span> 학생을 위한 공고 추천
                    </h1>
                </section>

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: 'var(--spacing-xl)'
                }}>
                    {contests.map(contest => (
                        <ContestCard key={contest.id} {...contest} />
                    ))}
                </div>

            </main>
        </div>
    );
};

export default ContestRecommendationPage;
