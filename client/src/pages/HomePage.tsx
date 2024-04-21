import React, { useState } from 'react';
import ContributionForm from '../components/ContributionForm';
import SummaryDisplay from '../components/SummaryDisplay';


const HomePage: React.FC = () => {

  const [summary, setSummary] = useState('');

  const handleSummaryGenerated = (generatedSummary: string) => {
    setSummary(generatedSummary);
  };
  return (
    <div>
      <h1>GitHub Contribution Summary</h1>
      <ContributionForm onSummaryGenerated={handleSummaryGenerated} />
      <SummaryDisplay summary={summary} />
    </div>
  );
};

export default HomePage;