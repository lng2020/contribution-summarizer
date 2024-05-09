import { Response } from 'express';
import summarize from './openai.ts';

const generateSummary = async (date: Date, contributionByRepo: repoContribution[], res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  res.write(`### Checkout my GitHub contributions from ${date.toDateString()}! `);
  res.write(`(powered by [my contribution summarizer](https://github.com/lng2020/contribution-summarizer))\n\n`);
  for (let i = 0; i < contributionByRepo.length; i++) {
    const contribution = contributionByRepo[i];
    const summarizedContent = await summarize(contribution);
    res.write(summarizedContent + `\n\n`);
  }

  res.end();
};

export default generateSummary;
