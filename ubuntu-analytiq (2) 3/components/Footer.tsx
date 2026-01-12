import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    const scrollToElement = () => {
      const element = document.getElementById('courses');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
  };

  return (
    <footer className="bg-brand-darker border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Ubuntu <span className="text-brand-primary">AnalytIQ</span></h3>
            <p className="text-gray-400 max-w-sm">
              Empowering organizations and individuals with data fluency, AI mastery, and autonomous agentic workflows.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-brand-accent">Home</Link></li>
              <li><a href="#courses" onClick={handleScrollToCourses} className="hover:text-brand-accent cursor-pointer">Courses</a></li>
              <li><Link to="/agentic" className="hover:text-brand-accent">Agentic AI</Link></li>
              <li><Link to="/assessment" className="hover:text-brand-accent">Assessment</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-brand-accent">LinkedIn</a></li>
              <li><a href="#" className="hover:text-brand-accent">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-brand-accent">Email Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Ubuntu AnalytIQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;