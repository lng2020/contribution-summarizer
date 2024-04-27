import React, { useState } from 'react';
import ContributionForm from '../components/ContributionForm';
import SummaryDisplay from '../components/SummaryDisplay';

const HomePage: React.FC = () => {
  const [summary, setSummary] = useState('');

  const handleSummaryGenerated = (generatedSummary: string) => {
    setSummary(generatedSummary);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-8">GitHub Contribution Summary</h1>
        <ContributionForm onSummaryGenerated={handleSummaryGenerated} />
      </div>
      <div className="w-2/3 p-8">
        <SummaryDisplay summary={summary} />
      </div>
    </div>
  );
};

export default HomePage;
