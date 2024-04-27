import React from 'react';

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Generated Summary</h2>
      <p className="text-gray-700">{summary}</p>
    </div>
  );
};

export default SummaryDisplay;
