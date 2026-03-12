import React from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // This maps the 'id' from your AcademyPage data to the actual Page Component
  const courseMap: Record<string, React.ReactNode> = {
    'excel-workshop': <ExcelCoursePage />,
    'powerbi-workshop': <PowerBICoursePage />,
    'ai-mastery': <AIMasteryCoursePage />,
    'ai-agents-masterclass': <AIAgentsCoursePage />,
  };

  return courseMap[id || ''] || <NotFoundPage />;
};

export default CourseDetail;
