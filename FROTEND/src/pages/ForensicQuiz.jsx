import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { fingerprintQuizQuestions, quizCategories } from '../data/fingerprintQuizData';

export default function ForensicQuiz() {
  const navigate = useNavigate();

  // Settings
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [questionCount, setQuestionCount] = useState(15);
  const [quizActive, setQuizActive] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Active quiz state
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Save to profile if logged in
  const [savedStatus, setSavedStatus] = useState('');

  // Start Quiz
  const startQuiz = (count) => {
    let pool = [...fingerprintQuizQuestions];
    if (selectedCategory !== 'All Topics') {
      pool = pool.filter((q) => q.category === selectedCategory);
    }

    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const finalCount = Math.min(count || questionCount, shuffled.length);
    const selected = shuffled.slice(0, finalCount);

    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setQuizActive(true);
    setQuizFinished(false);
    setSavedStatus('');
  };

  // Handle Option Select
  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === questions[currentIndex].correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: questions[currentIndex].id,
        selected: idx,
        isCorrect,
      },
    ]);
  };

  // Next Question
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  // Finish Quiz
  const finishQuiz = async () => {
    setQuizFinished(true);
    const finalScore = score + (selectedOption === questions[currentIndex]?.correct ? 1 : 0);
    const pct = Math.round((finalScore / questions.length) * 100);

    // Save to user profile if token exists
    const token = localStorage.getItem('token');
    const apiBase = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://forensic-1-2.onrender.com' : '')).replace(/\/+$/, '');

    if (token) {
      try {
        const res = await fetch(`${apiBase}/api/auth/quiz-result`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            score: finalScore,
            total: questions.length,
            percentage: pct,
          }),
        });
        if (res.ok) {
          setSavedStatus('✅ Score recorded to your Investigator Profile!');
        }
      } catch (err) {
        console.warn('Could not record score to backend:', err.message);
      }
    }
  };

  const currentQ = questions[currentIndex];
  const progressPct = questions.length > 0 ? Math.round(((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100) : 0;

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex flex-col px-margin-page py-container-padding gap-gutter w-full max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">quiz</span>
            <span className="font-data-label text-data-label uppercase tracking-widest">
              Forensic Examination Training · 100 Questions Bank
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg">Fingerprint Criminalistics Quiz</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Test and sharpen your dactyloscopy expertise based on Richard Saferstein's{' '}
            <em>Criminalistics: An Introduction to Forensic Science</em>, landmark legal cases, and standard ACE-V protocols.
          </p>
        </div>

        {/* Sub-nav */}
        <div className="flex gap-4 border-b border-outline-variant/20 pb-4 mb-2 overflow-x-auto">
          {[
            { label: 'Gallery', to: '/academy', icon: 'grid_view' },
            { label: 'Quiz Center (100 Qs)', to: '/academy/quiz', icon: 'quiz', active: true },
            { label: 'Practice Drill', to: '/academy/practice', icon: 'sports_score' },
            { label: 'Timeline', to: '/academy/timeline', icon: 'timeline' },
            { label: 'Case Archive', to: '/academy/archive', icon: 'folder_open' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className={`flex items-center gap-2 font-data-label text-data-label px-3 py-2 rounded transition-colors whitespace-nowrap cursor-pointer ${
                item.active
                  ? 'text-primary bg-primary/10 border border-primary/20'
                  : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* VIEW 1: Start Screen */}
        {!quizActive && !quizFinished && (
          <div className="flex flex-col gap-gutter">
            {/* Mode Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div
                onClick={() => startQuiz(10)}
                className="glass-panel p-6 rounded-xl flex flex-col gap-3 group cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                  Quick Sprint
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  10 randomized fingerprint and forensic science questions for quick revision.
                </p>
                <span className="font-data-label text-data-label text-primary mt-auto flex items-center gap-1">
                  Start 10 Questions →
                </span>
              </div>

              <div
                onClick={() => startQuiz(25)}
                className="glass-panel p-6 rounded-xl flex flex-col gap-3 group cursor-pointer hover:border-secondary/50 transition-all hover:-translate-y-1 border-secondary/30"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                  Standard Board Exam
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  25 comprehensive questions covering classification, minutiae, reagents, and legal cases.
                </p>
                <span className="font-data-label text-data-label text-secondary mt-auto flex items-center gap-1">
                  Start 25 Questions →
                </span>
              </div>

              <div
                onClick={() => startQuiz(100)}
                className="glass-panel p-6 rounded-xl flex flex-col gap-3 group cursor-pointer hover:border-tertiary/50 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined">military_tech</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-tertiary transition-colors">
                  Mastery Marathon (100 Qs)
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  The complete 100-question master question bank. The ultimate dactyloscopy test.
                </p>
                <span className="font-data-label text-data-label text-tertiary mt-auto flex items-center gap-1">
                  Take All 100 Questions →
                </span>
              </div>
            </div>

            {/* Custom Filter */}
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-4">
              <h3 className="font-data-value text-data-value text-on-surface">Or Filter by Specific Topic:</h3>
              <div className="flex flex-wrap gap-2">
                {quizCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full font-data-label text-data-label transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-variant text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => startQuiz(questionCount)}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded font-data-value text-data-value hover:bg-primary-fixed transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  Start Practice ({selectedCategory})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Active Quiz Question */}
        {quizActive && !quizFinished && currentQ && (
          <div className="flex flex-col gap-6">
            {/* Progress & Top Stats */}
            <div className="glass-panel p-4 rounded-lg flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-data-label text-on-surface-variant">
                <span>
                  Question <strong className="text-primary">{currentIndex + 1}</strong> of {questions.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-variant text-primary border border-outline-variant/30">
                  {currentQ.category}
                </span>
                <span>
                  Score: <strong className="text-primary">{score}</strong> / {currentIndex}
                </span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            {/* Question Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-xl flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="font-data-label text-xs uppercase px-2 py-0.5 rounded bg-primary/20 text-primary">
                  {currentQ.difficulty}
                </span>
                <span className="font-data-label text-xs text-outline">QID #{currentQ.id}</span>
              </div>

              <h2 className="font-headline-md text-headline-md text-on-surface leading-snug">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'glass-panel hover:border-primary/40 text-on-surface';
                  let icon = 'radio_button_unchecked';

                  if (isAnswered) {
                    if (idx === currentQ.correct) {
                      btnStyle = 'bg-primary/20 border-primary text-primary font-bold';
                      icon = 'check_circle';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-error/20 border-error text-error';
                      icon = 'cancel';
                    } else {
                      btnStyle = 'opacity-40 text-on-surface-variant';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`p-4 rounded-lg flex items-center gap-4 text-left transition-all cursor-pointer ${btnStyle}`}
                    >
                      <span className="material-symbols-outlined text-[20px] flex-shrink-0">{icon}</span>
                      <span className="font-body-md text-body-md flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {isAnswered && (
                <div className="flex flex-col gap-4 mt-2 p-4 rounded-lg bg-surface-container-low border border-outline-variant/30 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined ${
                        selectedOption === currentQ.correct ? 'text-primary' : 'text-error'
                      }`}
                    >
                      {selectedOption === currentQ.correct ? 'check_circle' : 'info'}
                    </span>
                    <strong className="font-data-value text-data-value text-on-surface">
                      {selectedOption === currentQ.correct ? 'Correct Answer!' : 'Incorrect'}
                    </strong>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <button
                    onClick={handleNext}
                    className="self-end px-6 py-2.5 bg-primary text-on-primary rounded font-data-value text-data-value hover:bg-primary-fixed transition-colors flex items-center gap-2 cursor-pointer shadow-[0_4px_14px_0_rgba(76,215,246,0.3)]"
                  >
                    {currentIndex + 1 < questions.length ? 'Next Question →' : 'See Final Results'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: Results Screen */}
        {quizFinished && (
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center gap-6 max-w-xl mx-auto w-full">
            <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">emoji_events</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-data-label text-data-label text-primary uppercase tracking-widest">
                Examination Complete
              </span>
              <h2 className="font-display-md text-display-md text-on-surface">
                {score} / {questions.length} Correct
              </h2>
              <p className="font-headline-sm text-headline-sm text-primary-fixed-dim">
                {Math.round((score / questions.length) * 100)}% Proficiency
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/30 text-left w-full">
              <div className="font-data-label text-xs uppercase text-on-surface-variant mb-1">Examiner Assessment</div>
              <p className="font-body-sm text-body-sm text-on-surface">
                {Math.round((score / questions.length) * 100) >= 85
                  ? '🌟 Outstanding! You demonstrate advanced proficiency in friction ridge examination and forensic criminalistics principles.'
                  : Math.round((score / questions.length) * 100) >= 65
                  ? '👍 Good performance! Solid foundation in pattern classification and chemical processing. Review the few missed cases to achieve mastery.'
                  : '📚 Keep practicing! Re-read the Saferstein Criminalistics summaries and landmark case studies to strengthen your fundamentals.'}
              </p>
            </div>

            {savedStatus && (
              <div className="p-3 bg-primary/10 border border-primary/30 rounded text-primary text-sm font-data-value">
                {savedStatus}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => startQuiz(questions.length)}
                className="flex-1 py-3 bg-primary text-on-primary rounded font-data-value text-data-value hover:bg-primary-fixed transition-colors cursor-pointer"
              >
                Retake Exam
              </button>
              <button
                onClick={() => setQuizActive(false)}
                className="flex-1 py-3 ghost-border bg-transparent text-on-surface rounded font-data-value text-data-value hover:bg-primary/10 transition-colors cursor-pointer"
              >
                Back to Quiz Menu
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
