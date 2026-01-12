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
  image: string;
  type: CourseType;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  category: 'Intermediate' | 'Advanced';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'chart' | 'brain' | 'bot';
}

export enum PaymentMethod {
  MPESA = 'MPESA',
  GLOBAL = 'GLOBAL'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

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
