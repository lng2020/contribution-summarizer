import React, { useState } from 'react';

interface ContributionFormProps {
  onSummaryGenerated: (summary: string) => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ onSummaryGenerated }) => {
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
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
          GitHub Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Enter your GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="starNumbers">
          Minimum Star Numbers
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="starNumbers"
          type="number"
          placeholder="Enter minimum star numbers"
          value={starNumbers}
          onChange={(e) => setStarNumbers(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="contributionType">
          Contribution Type
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="contributionType"
          value={contributionType}
          onChange={(e) => setContributionType(e.target.value)}
        >
          <option value="">Select Contribution Type</option>
          <option value="commits">Commits</option>
          <option value="issues">Issues</option>
          <option value="pullRequests">Pull Requests</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="timeRange">
          Time Range
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="timeRange"
          type="text"
          placeholder="Enter time range (e.g., last year, last 6 months)"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="excludeRepos">
          Exclude Repositories
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="excludeRepos"
          placeholder="Enter repositories to exclude (comma-separated)"
          value={excludeRepos}
          onChange={(e) => setExcludeRepos(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="includeRepos">
          Include Repositories
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="includeRepos"
          placeholder="Enter repositories to include (comma-separated)"
          value={includeRepos}
          onChange={(e) => setIncludeRepos(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Generate Summary
      </button>
    </form>
  );
};

export default ContributionForm;
