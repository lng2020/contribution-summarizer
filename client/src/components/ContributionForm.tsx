import { METHODS } from 'http';
import React, { useState } from 'react';

interface ContributionFormProps {
  onSummaryGenerated: (summary: string) => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({onSummaryGenerated}) => {
  const [username, setUsername] = useState('');
  const [starNumbers, setStarNumbers] = useState('');
  const [contributionType, setContributionType] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [excludeRepos, setExcludeRepos] = useState('');
  const [includeRepos, setIncludeRepos] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/generate-summary', {
        method: 'POST',
        body: JSON.stringify({
        username,
        starNumbers,
        contributionType,
        timeRange,
        excludeRepos,
        includeRepos,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    onSummaryGenerated(await response.text());
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields for username, starNumbers, contributionType, timeRange, excludeRepos, includeRepos */}
      <button type="submit">Generate Summary</button>
    </form>
  );
};

export default ContributionForm;