import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  const [displayedSummary, setDisplayedSummary] = useState<string>('');

  useEffect(() => {
    setDisplayedSummary('');

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < summary.length) {
        setDisplayedSummary((prevSummary) => prevSummary + summary.slice(currentIndex, currentIndex + 10));
        currentIndex += 10;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [summary]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Generated Summary</h2>
      <ReactMarkdown>{displayedSummary}</ReactMarkdown>
    </div>
  );
};

export default SummaryDisplay;
