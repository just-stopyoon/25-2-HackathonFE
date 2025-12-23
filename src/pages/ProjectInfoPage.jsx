import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import FormSection from '../components/Form/FormSection';
import TextAreaField from '../components/Form/TextAreaField';

const ProjectInfoPage = () => {
    const [activeSection, setActiveSection] = useState('service-core');

    // Simple scroll spy to update active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['service-core', 'problem-customer', 'feasibility', 'growth-strategy', 'team'];

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky headers if any, or just spacing
            const offset = 40;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active state manually for immediate feedback
            setActiveSection(id);
        }
    };

    return (
        <MainLayout activeSection={activeSection} onSectionClick={scrollToSection}>
            <div style={{ marginBottom: '4rem' }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: 'var(--primary)',
                    marginBottom: 'var(--spacing-sm)'
                }}>
                    서비스 핵심 정보
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    프로젝트의 핵심 가치와 목표를 명확하게 정의해주세요.
                </p>
            </div>

            <div style={{
                backgroundColor: 'var(--surface)',
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <FormSection id="service-core" title="서비스 핵심 정보">
                    <TextAreaField
                        label="서비스(아이디어) 이름이 무엇인가요?"
                        placeholder="서비스명을 입력해주세요."
                        helpText="기억하기 쉽고 서비스의 특징을 잘 나타내는 이름이 좋습니다."
                    />
                    <TextAreaField
                        label="이 서비스를 한 문장으로 소개해 주세요."
                        placeholder="예: 000문제를 해결하는 000 서비스"
                        helpText="서비스의 핵심 가치를 가장 잘 드러내는 한 문장을 작성해주세요."
                    />
                    <TextAreaField
                        label="이 서비스를 만들게 된 계기나 문제 상황을 알려주세요."
                        placeholder="어떤 불편함이나 필요성에서 시작되었나요?"
                        helpText="개인적인 경험이나 관찰한 문제 상황을 구체적으로 적어주세요."
                        minHeight="160px"
                    />
                </FormSection>

                <FormSection id="problem-customer" title="문제 인식 & 고객 정의">
                    <TextAreaField
                        label="이 서비스가 해결하려는 핵심 문제는 무엇인가요?"
                        placeholder="구체적인 문제 상황을 정의해주세요."
                        helpText="표면적인 현상보다 근본적인 원인에 집중해주세요."
                    />
                    <TextAreaField
                        label="이 문제를 가장 크게 겪는 사람은 누구인가요?"
                        placeholder="주요 타겟 고객층을 정의해주세요."
                        helpText="구체적인 특성(나이, 직업, 상황 등)을 포함하면 좋습니다."
                    />
                    <TextAreaField
                        label="기존에는 이 문제를 어떻게 해결하고 있었나요?"
                        placeholder="경쟁 서비스나 대체재가 있다면 적어주세요."
                    />
                    <TextAreaField
                        label="기존 방식의 불편한 점을 적어주세요. (3개 이상)"
                        placeholder="1. 비용이 비싸다... 2. 시간이 오래 걸린다..."
                        minHeight="160px"
                    />
                </FormSection>

                <FormSection id="feasibility" title="개요 & 실현 가능성">
                    <TextAreaField
                        label="이 문제를 해결하기 위한 핵심 기능을 적어주세요."
                        placeholder="주요 기능 3~5가지를 나열해주세요."
                    />
                    <TextAreaField
                        label="기존 방식과 비교했을 때, 우리 서비스의 가장 큰 차별점은 무엇인가요?"
                        placeholder="우리 서비스만이 제공할 수 있는 가치를 설명해주세요."
                    />
                    <TextAreaField
                        label="현재 구현 수준은 어디까지 왔나요?"
                        placeholder="기획 단계, 프로토타입 완료 등 현재 진행 상황을 적어주세요."
                    />
                </FormSection>

                <FormSection id="growth-strategy" title="성장 전략 & 사업화">
                    <TextAreaField
                        label="서비스는 누구에게, 어떤 방식으로 수익을 만들 수 있나요?"
                        placeholder="비즈니스 모델(수익 구조)을 설명해주세요."
                    />
                    <TextAreaField
                        label="처음에 집중하고 싶은 도입 대상은 어디인가요?"
                        placeholder="초기 시장 진입 전략을 적어주세요."
                    />
                    <TextAreaField
                        label="앞으로 확장한다면 어떤 방향으로 가질 수 있나요?"
                        placeholder="향후 로드맵이나 확장 가능성을 설명해주세요."
                    />
                </FormSection>

                <FormSection id="team" title="팀 구성 & 역할">
                    <TextAreaField
                        label="팀 구성원과 역할을 적어주세요."
                        placeholder="이름(역할) 형태로 적어주세요. 예: 김철수(기획/디자인)"
                        minHeight="160px"
                    />
                    <TextAreaField
                        label="왜 팀이 이 서비스를 만들기에 적합한 이유는 무엇인가요?"
                        placeholder="팀원들의 경험, 역량, 팀워크 등을 어필해주세요."
                    />
                </FormSection>

                <div style={{ marginTop: 'var(--spacing-xl)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)' }}>
                    <button style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        fontWeight: '600'
                    }}>
                        임시 저장
                    </button>
                    <button className="btn btn-primary" style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        fontSize: '1rem'
                    }}>
                        제출하기
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProjectInfoPage;
