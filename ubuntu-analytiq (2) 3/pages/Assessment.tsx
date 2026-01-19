import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS } from '../constants';

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showGate, setShowGate] = useState(false);
  const [email, setEmail] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);

  const currentQ = ASSESSMENT_QUESTIONS[currentQIndex];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setShowGate(true);
    }
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;

    // Calculate score
    let score = 0;
    answers.forEach((ans, idx) => {
      if (ans === ASSESSMENT_QUESTIONS[idx].correctIndex) {
        score++;
      }
    });
    setCalculatedScore(score);
    setShowGate(false);
    setShowResults(true);

    // In production, send email to backend here
  };

  const percentage = Math.round((calculatedScore / ASSESSMENT_QUESTIONS.length) * 100);
  const isAdvanced = percentage >= 70;
  
  const recommendedPlan = isAdvanced ? {
    name: '1-Month AI Agents Mastery Plan',
    price: 7500,
    desc: 'Design and deploy autonomous AI agents with direct mentor guidance.',
    id: 'plan-agents'
  } : {
    name: '1-Month AI Mastery Plan',
    price: 2500,
    desc: 'Master the fundamentals with structured weekly modules and expert check-ins.',
    id: 'plan-mastery'
  };

  const handleUnlock = () => {
    navigate('/checkout', { 
      state: { 
        courseId: recommendedPlan.id, 
        price: recommendedPlan.price, 
        title: recommendedPlan.name 
      } 
    });
  };

  // QUIZ VIEW
  if (!showGate && !showResults) {
    return (
      <div className="min-h-screen bg-brand-darker py-12 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              Discover Your AI IQ & <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                Future-Proof Your Career
              </span>
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-gray-400 text-sm mb-2">
              <span>Question {currentQIndex + 1} of {ASSESSMENT_QUESTIONS.length}</span>
              <span>{Math.round(((currentQIndex) / ASSESSMENT_QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-primary transition-all duration-300" 
                style={{ width: `${((currentQIndex) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <span className="inline-block px-3 py-1 bg-brand-secondary/20 text-brand-secondary text-xs rounded-full font-bold mb-4">
              {currentQ.category}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8">{currentQ.text}</h2>
            <div className="space-y-4">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full text-left p-4 rounded-xl border border-gray-700 bg-gray-800/50 hover:bg-brand-secondary/10 hover:border-brand-secondary transition-all text-gray-200 group"
                >
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full border border-gray-500 mr-4 mt-0.5 group-hover:border-brand-secondary flex-shrink-0"></div>
                    <span>{opt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMAIL GATE
  if (showGate) {
    return (
      <div className="fixed inset-0 bg-brand-darker/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-brand-primary/30 p-8 rounded-2xl max-w-md w-full shadow-2xl animate-float">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Assessment Complete</h2>
          <p className="text-gray-400 text-center mb-6">Enter your email to reveal your Fluency Score and generate your personalized roadmap.</p>
          <form onSubmit={handleGateSubmit} className="space-y-4">
            <input 
              type="email" 
              required
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:border-brand-primary focus:outline-none"
            />
            <button 
              type="submit"
              className="w-full bg-brand-primary text-black font-bold py-3 rounded-lg hover:bg-brand-accent transition-colors"
            >
              Reveal My Score
            </button>
          </form>
        </div>
      </div>
    );
  }

  // RESULTS DASHBOARD
  if (showResults) {
    return (
      <div className="min-h-screen bg-brand-darker py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-2">Your AI Fluency Profile</h1>
            <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mt-4">
              {percentage}%
            </div>
            <p className="text-xl text-gray-400 mt-2">
              {isAdvanced ? 'Advanced Strategist' : 'Emerging Practitioner'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Recommendation Card */}
            <div className="bg-gray-900 border-2 border-brand-primary rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-primary text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMMENDED
              </div>
              <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Your Personalized Plan</h3>
              <h2 className="text-2xl font-bold text-white mb-4">{recommendedPlan.name}</h2>
              <p className="text-gray-300 mb-6">{recommendedPlan.desc}</p>
              <div className="text-3xl font-bold text-white mb-6">
                KES {recommendedPlan.price.toLocaleString()}
                <span className="text-sm text-gray-500 font-normal ml-2">/ one-time</span>
              </div>
              
              <ul className="space-y-3 mb-8 text-sm text-gray-400">
                <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Human-in-the-loop Mentorship</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Weekly Action Modules</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Certification on Completion</li>
              </ul>

              <button 
                onClick={handleUnlock}
                className="w-full bg-brand-primary text-black font-bold py-4 rounded-xl hover:bg-brand-accent transition-all transform hover:scale-[1.02] shadow-lg shadow-brand-primary/20"
              >
                Unlock My Personalized Plan
              </button>
            </div>

            {/* The Locked Content Preview */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 relative grayscale opacity-70 pointer-events-none select-none">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-gray-800 p-4 rounded-full border border-gray-600">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Detailed Execution Roadmap</h3>
              <div className="space-y-4 blur-sm">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-20 bg-gray-700 rounded w-full mt-4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default Assessment;
