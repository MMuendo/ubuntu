import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
      setIsOpen(false);
      navigate(path);
  }

  const handleScrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    
    const scrollToElement = () => {
      const element = document.getElementById('courses');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and DOM render
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl md:text-2xl font-bold text-gray-100 tracking-tighter">
            Ubuntu <span className="text-brand-primary">AnalytIQ</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => navigate('/')} className="text-gray-300 hover:text-brand-accent transition-colors text-sm font-medium">Home</button>
            <a href="#courses" onClick={handleScrollToCourses} className="text-gray-300 hover:text-brand-accent transition-colors text-sm font-medium cursor-pointer">Courses</a>
            <Link to="/assessment" className="text-gray-300 hover:text-brand-accent transition-colors text-sm font-medium">AI Fluency</Link>
            <Link to="/agentic" className="text-gray-300 hover:text-brand-accent transition-colors text-sm font-medium">Agentic AI</Link>
            <Link to="/blog" className="text-gray-300 hover:text-brand-accent transition-colors text-sm font-medium">Blog</Link>
            <Link to="/assessment" className="bg-brand-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition-all">
              Start Journey
            </Link>
          </div>

          {/* Mobile Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-darker border-b border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button onClick={() => handleNav('/')} className="block w-full text-left py-2 text-gray-300 hover:text-brand-accent">Home</button>
            <a href="#courses" onClick={handleScrollToCourses} className="block w-full text-left py-2 text-gray-300 hover:text-brand-accent cursor-pointer">Courses</a>
            <button onClick={() => handleNav('/assessment')} className="block w-full text-left py-2 text-gray-300 hover:text-brand-accent">AI Fluency</button>
            <button onClick={() => handleNav('/agentic')} className="block w-full text-left py-2 text-gray-300 hover:text-brand-accent">Agentic AI</button>
             <button onClick={() => handleNav('/blog')} className="block w-full text-left py-2 text-gray-300 hover:text-brand-accent">Blog</button>
            <button onClick={() => handleNav('/assessment')} className="block w-full mt-4 text-center bg-brand-secondary text-white py-2 rounded-md">
              Start Journey
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;