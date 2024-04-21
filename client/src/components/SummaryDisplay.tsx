import React from 'react';

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  return (
    <div>
      <h2>Generated Summary</h2>
      <p>{summary}</p>
    </div>
  );
};

export default SummaryDisplay;