import { Response } from 'express';
import summarize from './openai.ts';

const generateSummary = async (contributionByRepo: repoContribution[], res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  for (let i = 0; i < contributionByRepo.length; i++) {
    const contribution = contributionByRepo[i];
    const summarizedContent = await summarize(contribution.contributions);
    res.write(`\n### ${contribution.repository.name}\n${summarizedContent}\n`);
  }

  res.end();
};

export default generateSummary;
