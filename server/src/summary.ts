import summarize from './openai.ts';

const generateSummary = (contributionByRepo: repoContribution[]) => {
  let summaryTmpl = `
## Contribution Summary
`;
  for (let i = 0; i < contributionByRepo.length; i++) {
    const contribution = contributionByRepo[i];
    const summarizedContent = summarize(contribution.contributions);
    summaryTmpl += `
### ${contribution.repository.name}
${summarizedContent}
`;
  }
  return summaryTmpl;
};

export default generateSummary;
