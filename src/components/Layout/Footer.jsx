import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#28328c', color: 'white', padding: 'var(--spacing-xl) 0', marginTop: '4rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--spacing-md)', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)', fontWeight: '600' }}>
                    <span>개인정보처리방침</span>
                    <span>서비스 이용 약관</span>
                </div>
                <div style={{ opacity: 0.8, lineHeight: '1.6' }}>
                    <div style={{ fontWeight: '700', marginBottom: '4px' }}>INFO.</div>
                    <div>2025학년도 2학기 SW AI 해커톤 Hello World 팀</div>
                    <div>세종대학교 지능기전공학부 스마트기기공학전공 정지윤 최연수 이현규</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
