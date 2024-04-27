import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface SummaryDisplayProps {
  summary: string;
  isGenerating: boolean;
  resetSummary: () => void;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, isGenerating, resetSummary }) => {
  const [mode, setMode] = useState<'preview' | 'raw'>('preview');

  const handleGenerateAgain = () => {
    if (!isGenerating) {
      resetSummary();
    }
  };

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
        <button onClick={handleGenerateAgain} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Again'}
        </button>
      </div>
      {mode === 'preview' ? <ReactMarkdown>{summary}</ReactMarkdown> : <pre>{summary}</pre>}
    </div>
  );
};

export default SummaryDisplay;
