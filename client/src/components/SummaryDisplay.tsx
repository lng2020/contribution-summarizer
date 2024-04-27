import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  const [displayedSummary, setDisplayedSummary] = useState<string>('');
  const [mode, setMode] = useState<'preview' | 'raw'>('preview');

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 className="text-2xl font-bold mb-4">Generated Summary</h2>
      <div className="mb-4">
        <button className={`mr-4 ${mode === 'preview' ? 'font-bold' : ''}`} onClick={() => setMode('preview')}>
          Preview
        </button>
        <button className={`mr-4 ${mode === 'raw' ? 'font-bold' : ''}`} onClick={() => setMode('raw')}>
          Raw
        </button>
        <button onClick={copyToClipboard}>Copy</button>
      </div>
      {mode === 'preview' ? <ReactMarkdown>{displayedSummary}</ReactMarkdown> : <pre>{displayedSummary}</pre>}
    </div>
  );
};

export default SummaryDisplay;
