import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ContributionFormProps {
  onSummaryGenerated: (summary: string) => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ onSummaryGenerated }) => {
  const [username, setUsername] = useState('');
  const [starNumbers, setStarNumbers] = useState('');
  const [date, setDate] = useState(new Date());
  const [excludeRepos, setExcludeRepos] = useState('');
  const [includeRepos, setIncludeRepos] = useState('');

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    onSummaryGenerated('');

    try {
      const response = await fetch('http://localhost:5000/api/generate-summary', {
        method: 'POST',
        body: JSON.stringify({
          username,
          starNumbers,
          date: date ? date.toISOString() : null,
          excludeRepos,
          includeRepos,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      let summary = '';

      for (;;) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = new TextDecoder().decode(value);
        summary += chunk;
        onSummaryGenerated(summary);
      }
    } catch (error) {
      throw new Error(`Failed to generate summary: ${error}`);
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
        <label className="block text-gray-700 font-bold mb-2">Date</label>
        <DatePicker
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
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
