import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
  baseURL: process.env.OPENAI_PROXY ? process.env.OPENAI_PROXY : undefined,
});

const promptTmpl = `
I will provide you with a list of GitHub pull requests (PRs) or issues, each including a title and description. Your task is to first list each contribution by its title, and then provide a focused summary highlighting the common technical area, primary goals, and relevance of the contributions for potential job providers and readers of your GitHub profile.

When listing the contributions, please include only the title of each contribution, separated by commas.

After listing all the contributions, provide a summary that focuses on:
1. The common technical area or domain the contributions relate to (e.g., security, performance, new features).
2. How these contributions demonstrate your skills and experience, you should hightlight the keyword using **.

Incorporate relevant keywords or phrases from the contribution titles or descriptions into the summary. Aim for a clear, coherent, and easily understandable writing style while avoiding unnecessary technical jargon or acronyms unless they are essential and explained.

The summary should be limited to 200-300 characters.

Please format your response like this:

Contributions: [Contribution 1 Title], [Contribution 2 Title], ..., [Contribution N Title]

Summary:
[Focused summary highlighting the common technical area, primary goals, and relevance for potential job providers and GitHub profile readers]

Replace the placeholders with the actual contribution titles and your focused summary.
`;

const summarize = async (contributions: contribution[]) => {
  const prompt = contributions
    .map((contribution: contribution) => {
      return `Title: ${contribution.title}\nDescription: ${contribution.description}\n`;
    })
    .join('\n');

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: promptTmpl,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
  return response.choices[0].message.content;
};

export default summarize;
