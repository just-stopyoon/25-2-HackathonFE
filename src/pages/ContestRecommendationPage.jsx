import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Search/SearchBar';
import ContestCard from '../components/Card/ContestCard';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';

// Placeholder images to cycle through
const PLACEHOLDER_IMAGES = [
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const ContestRecommendationPage = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/competitions/recommend');
                if (!response.ok) {
                    throw new Error('Failed to fetch recommendations');
                }
                const data = await response.json();

                // Map API data to component props and assign random image
                const mappedData = data.map((item, index) => ({
                    id: item.id || index,
                    title: item.name,
                    organization: item.organizer,
                    dueDate: item.deadline, // Ensure this format is okay or format it
                    categories: item.tracks,
                    image: PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]
                }));

                setContests(mappedData);
            } catch (err) {
                console.error("Error fetching contests:", err);
                setError("공모전 정보를 불러오는 중 오류가 발생했습니다.");
                // Fallback to empty or previous mock data could be an option, but showing error for now
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, []);

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

                {/* Loading / Error / Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--text-muted)' }}>
                        추천 공모전을 불러오는 중입니다...
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--error)' }}>
                        {error}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: 'var(--spacing-xl)'
                    }}>
                        {contests.map(contest => (
                            <ContestCard key={contest.id} {...contest} />
                        ))}
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
};

export default ContestRecommendationPage;
