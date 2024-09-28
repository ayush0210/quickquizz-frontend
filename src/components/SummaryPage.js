import React from 'react';
import { useLocation } from 'react-router-dom';

const SummaryPage = () => {
  const location = useLocation();
  const { summary } = location.state || {};

  if (!summary) {
    return <div>No summary available. Please upload a PDF first.</div>;
  }

  return (
    <div>
      <h1>PDF Summary</h1>
      <div>{summary}</div>
    </div>
  );
};

export default SummaryPage;