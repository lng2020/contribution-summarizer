import React from 'react';
import { useState, useEffect } from 'react';

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  const [streamedSummary, setStreamedSummary] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setStreamedSummary((prevSummary) => prevSummary + summary.slice(0, 1));
      summary = summary.slice(1);
    }, 50);

    return () => clearInterval(interval);
  }, [summary]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Generated Summary</h2>
      <p className="text-gray-700">{streamedSummary}</p>
    </div>
  );
};

export default SummaryDisplay;
