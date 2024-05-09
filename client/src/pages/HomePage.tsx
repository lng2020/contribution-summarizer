import React, { useState } from 'react';
import ContributionForm from '../components/ContributionForm';
import SummaryDisplay from '../components/SummaryDisplay';

const HomePage: React.FC = () => {
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSummaryGenerated = (chunk: string) => {
    setSummary((prevSummary) => prevSummary + chunk);
  };

  const resetSummary = () => {
    setSummary('');
    setIsGenerating(true);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 bg-gray-100 p-8 overflow-auto">
        <h1 className="text-4xl font-bold mb-8">GitHub Contribution Summarizer</h1>
        <ContributionForm
          onSummaryGenerated={handleSummaryGenerated}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </div>
      <div className="w-2/3 bg-gray-100 p-8">
        <SummaryDisplay summary={summary} isGenerating={isGenerating} resetSummary={resetSummary} />
      </div>
    </div>
  );
};

export default HomePage;
