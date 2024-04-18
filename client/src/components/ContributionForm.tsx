import React, { useState } from 'react';

const ContributionForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [starNumbers, setStarNumbers] = useState('');
  const [contributionType, setContributionType] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [excludeRepos, setExcludeRepos] = useState('');
  const [includeRepos, setIncludeRepos] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send form data to the back-end API
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields for username, starNumbers, contributionType, timeRange, excludeRepos, includeRepos */}
      <button type="submit">Generate Summary</button>
    </form>
  );
};

export default ContributionForm;