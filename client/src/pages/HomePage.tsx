import React, { useState } from 'react';
import ContributionForm from '../components/ContributionForm';
import SummaryDisplay from '../components/SummaryDisplay';

const HomePage: React.FC = () => {
  const [summary, setSummary] = useState('');

  const handleSummaryGenerated = (generatedSummary: string) => {
    setSummary(generatedSummary);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-4xl font-bold mb-8">GitHub Contribution Summary</h1>
      <ContributionForm onSummaryGenerated={handleSummaryGenerated} />
      <SummaryDisplay summary={summary} />
    </div>
  );
};

export default HomePage;
