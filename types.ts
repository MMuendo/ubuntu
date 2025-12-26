export type ViewState = 'home' | 'checkout' | 'assessment' | 'agentic' | 'blog' | 'success';

export interface Course {
  id: string;
  title: string;
  price: number;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number; // For scoring purposes, though PRD implies a proficiency mapping
  category: 'Strategy' | 'Technical' | 'Ethics';
}

export interface AssessmentResult {
  score: number;
  level: string; // "Advanced Strategist" etc.
  recommendedPlan: Course;
}

export interface UserInfo {
  email: string;
  phone?: string;
  name?: string;
}

export interface Product {
    name: string;
    price: number;
    description: string;
    id: string;
}