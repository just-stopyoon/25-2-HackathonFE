import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import FormSection from '../components/Form/FormSection';
import TextAreaField from '../components/Form/TextAreaField';

// Configuration for questions to map IDs to specific question text
const QUESTION_CONFIG = [
    // Service Core (1-x)
    { id: '1-1', label: '서비스(아이디어) 이름이 무엇인가요?', question: '서비스 이름이 무엇인가요?' },
    { id: '1-2', label: '이 서비스를 한 문장으로 소개해 주세요.', question: '한 줄 소개를 해주세요.' },
    { id: '1-3', label: '이 서비스를 만들게 된 계기나 문제 상황을 알려주세요.', question: '서비스 계기 및 문제 상황' },

    // Problem & Customer (2-x)
    { id: '2-1', label: '이 서비스가 해결하려는 핵심 문제는 무엇인가요?', question: '핵심 문제는 무엇인가요?' },
    { id: '2-2', label: '이 문제를 가장 크게 겪는 사람은 누구인가요?', question: '타겟 고객은 누구인가요?' },
    { id: '2-3', label: '기존에는 이 문제를 어떻게 해결하고 있었나요?', question: '기존 해결 방식' },
    { id: '2-4', label: '기존 방식의 불편한 점을 적어주세요. (3개 이상)', question: '기존 방식의 불편한 점' },

    // Feasibility (3-x)
    { id: '3-1', label: '이 문제를 해결하기 위한 핵심 기능을 적어주세요.', question: '핵심 기능' },
    { id: '3-2', label: '기존 방식과 비교했을 때, 우리 서비스의 가장 큰 차별점은 무엇인가요?', question: '차별점' },
    { id: '3-3', label: '현재 구현 수준은 어디까지 왔나요?', question: '현재 구현 수준' },

    // Growth (4-x)
    { id: '4-1', label: '서비스는 누구에게, 어떤 방식으로 수익을 만들 수 있나요?', question: '수익 모델' },
    { id: '4-2', label: '처음에 집중하고 싶은 도입 대상은 어디인가요?', question: '초기 도입 대상' },
    { id: '4-3', label: '앞으로 확장한다면 어떤 방향으로 가질 수 있나요?', question: '확장 전략' },

    // Team (5-x)
    { id: '5-1', label: '팀 구성원과 역할을 적어주세요.', question: '팀 구성 및 역할' },
    { id: '5-2', label: '왜 팀이 이 서비스를 만들기에 적합한 이유는 무엇인가요?', question: '팀 역량' },
];

const ProjectInfoPage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('service-core');
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize state with empty strings for controlled inputs
    useEffect(() => {
        const initialAnswers = {};
        QUESTION_CONFIG.forEach(q => {
            initialAnswers[q.id] = '';
        });
        setAnswers(prev => ({ ...initialAnswers, ...prev }));
    }, []);

    const handleInputChange = (id, value) => {
        setAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Construct payload
        const payload = {
            team_name: "해커톤우승팀", // Default as requested
            answers: QUESTION_CONFIG.map(q => ({
                question_id: q.id,
                question: q.question,
                answer: answers[q.id] || ""
            }))
        };

        try {
            console.log('Submitting Payload:', payload);
            const response = await fetch('http://127.0.0.1:8000/api/v1/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('제출이 완료되었습니다!');
                navigate('/recommendations');
            } else {
                alert('제출에 실패했습니다. 다시 시도해주세요.');
                console.error('Submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('네트워크 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Simple scroll spy logic
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
            const offset = 40;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
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
                        label={QUESTION_CONFIG[0].label}
                        placeholder="서비스명을 입력해주세요."
                        helpText="기억하기 쉽고 서비스의 특징을 잘 나타내는 이름이 좋습니다."
                        value={answers['1-1']}
                        onChange={(e) => handleInputChange('1-1', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[1].label}
                        placeholder="예: 000문제를 해결하는 000 서비스"
                        helpText="서비스의 핵심 가치를 가장 잘 드러내는 한 문장을 작성해주세요."
                        value={answers['1-2']}
                        onChange={(e) => handleInputChange('1-2', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[2].label}
                        placeholder="어떤 불편함이나 필요성에서 시작되었나요?"
                        helpText="개인적인 경험이나 관찰한 문제 상황을 구체적으로 적어주세요."
                        minHeight="160px"
                        value={answers['1-3']}
                        onChange={(e) => handleInputChange('1-3', e.target.value)}
                    />
                </FormSection>

                <FormSection id="problem-customer" title="문제 인식 & 고객 정의">
                    <TextAreaField
                        label={QUESTION_CONFIG[3].label}
                        placeholder="구체적인 문제 상황을 정의해주세요."
                        helpText="표면적인 현상보다 근본적인 원인에 집중해주세요."
                        value={answers['2-1']}
                        onChange={(e) => handleInputChange('2-1', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[4].label}
                        placeholder="주요 타겟 고객층을 정의해주세요."
                        helpText="구체적인 특성(나이, 직업, 상황 등)을 포함하면 좋습니다."
                        value={answers['2-2']}
                        onChange={(e) => handleInputChange('2-2', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[5].label}
                        placeholder="경쟁 서비스나 대체재가 있다면 적어주세요."
                        value={answers['2-3']}
                        onChange={(e) => handleInputChange('2-3', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[6].label}
                        placeholder="1. 비용이 비싸다... 2. 시간이 오래 걸린다..."
                        minHeight="160px"
                        value={answers['2-4']}
                        onChange={(e) => handleInputChange('2-4', e.target.value)}
                    />
                </FormSection>

                <FormSection id="feasibility" title="개요 & 실현 가능성">
                    <TextAreaField
                        label={QUESTION_CONFIG[7].label}
                        placeholder="주요 기능 3~5가지를 나열해주세요."
                        value={answers['3-1']}
                        onChange={(e) => handleInputChange('3-1', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[8].label}
                        placeholder="우리 서비스만이 제공할 수 있는 가치를 설명해주세요."
                        value={answers['3-2']}
                        onChange={(e) => handleInputChange('3-2', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[9].label}
                        placeholder="기획 단계, 프로토타입 완료 등 현재 진행 상황을 적어주세요."
                        value={answers['3-3']}
                        onChange={(e) => handleInputChange('3-3', e.target.value)}
                    />
                </FormSection>

                <FormSection id="growth-strategy" title="성장 전략 & 사업화">
                    <TextAreaField
                        label={QUESTION_CONFIG[10].label}
                        placeholder="비즈니스 모델(수익 구조)을 설명해주세요."
                        value={answers['4-1']}
                        onChange={(e) => handleInputChange('4-1', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[11].label}
                        placeholder="초기 시장 진입 전략을 적어주세요."
                        value={answers['4-2']}
                        onChange={(e) => handleInputChange('4-2', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[12].label}
                        placeholder="향후 로드맵이나 확장 가능성을 설명해주세요."
                        value={answers['4-3']}
                        onChange={(e) => handleInputChange('4-3', e.target.value)}
                    />
                </FormSection>

                <FormSection id="team" title="팀 구성 & 역할">
                    <TextAreaField
                        label={QUESTION_CONFIG[13].label}
                        placeholder="이름(역할) 형태로 적어주세요. 예: 김철수(기획/디자인)"
                        minHeight="160px"
                        value={answers['5-1']}
                        onChange={(e) => handleInputChange('5-1', e.target.value)}
                    />
                    <TextAreaField
                        label={QUESTION_CONFIG[14].label}
                        placeholder="팀원들의 경험, 역량, 팀워크 등을 어필해주세요."
                        value={answers['5-2']}
                        onChange={(e) => handleInputChange('5-2', e.target.value)}
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
                    <button
                        onClick={handleSubmit}
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{
                            padding: 'var(--spacing-md) var(--spacing-xl)',
                            fontSize: '1rem',
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}>
                        {isSubmitting ? '제출 중...' : '제출하기'}
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProjectInfoPage;
