export type ViewState = 'home' | 'checkout' | 'assessment' | 'agentic' | 'blog' | 'success';

// Course type classification
export enum CourseType {
  WORKSHOP = 'WORKSHOP',
  MASTERCLASS = 'MASTERCLASS',
  MASTERY = 'MASTERY'
}

export interface Course {
  id: string;
  title: string;
  price: number;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  image?: string;
  type?: CourseType;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  category: 'Strategy' | 'Technical' | 'Ethics' | 'Intermediate' | 'Advanced';
}

export interface AssessmentResult {
  score: number;
  level: string;
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

// Service offerings
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'chart' | 'brain' | 'bot';
}

// Payment methods
export enum PaymentMethod {
  MPESA = 'MPESA',
  GLOBAL = 'GLOBAL'
}

// Chat message for AI assistants
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Blog post structure
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}