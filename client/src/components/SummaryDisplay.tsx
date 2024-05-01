import React, { useState } from 'react';
import Markdown from 'react-markdown';

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
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col h-screen">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <button
            className={`mr-4 px-4 py-2 rounded-md ${
              mode === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setMode('preview')}
          >
            Preview
          </button>
          <button
            className={`mr-4 px-4 py-2 rounded-md ${
              mode === 'raw' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setMode('raw')}
          >
            Raw
          </button>
          <button
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <button
          className={`px-4 py-2 rounded-md ${
            isGenerating
              ? 'bg-blue-500 text-white'
              : 'bg-green-500 text-white hover:bg-green-600 transition-colors duration-200'
          }`}
          onClick={handleGenerateAgain}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Again'}
        </button>
      </div>
      {mode === 'preview' ? (
        <div className="overflow-auto flex-grow">
          <div className="prose max-w-none">
            <Markdown>{summary}</Markdown>
          </div>
        </div>
      ) : (
        <pre className="overflow-auto flex-grow">{summary}</pre>
      )}
    </div>
  );
};

export default SummaryDisplay;
