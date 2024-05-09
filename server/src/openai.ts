import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
  baseURL: process.env.OPENAI_PROXY ? process.env.OPENAI_PROXY : undefined,
});

const promptTmpl = `
I will provide you with a GitHub repo information(name, star count, link) and a list of GitHub pull requests (PRs) or issues associated with the repo, each including a title, description, and permalink. Your task is to first list each contribution by its title (with the permalink in the []() format), and then provide a focused summary highlighting the common technical area, primary goals, and relevance of the contributions for potential job providers and readers of your GitHub profile.

When listing the contributions, please include the title of each contribution, followed by the permalink in the []() format, separated by commas.

After listing all the contributions, provide a summary that focuses on:
1. The common technical area or domain the contributions relate to (e.g., security, performance, new features).
2. How these contributions demonstrate your skills and experience, you should highlight the relevant keywords using **.

Incorporate relevant keywords or phrases from the contribution titles or descriptions into the summary. Aim for a clear, coherent, and easily understandable writing style while avoiding unnecessary technical jargon or acronyms unless they are essential and explained.

The summary should be limited to 200-300 characters.

Please format your response like this:
- [repo name](repo url)
  - [Contribution 1 Title]([Contribution 1 Permalink]), [Contribution 2 Title]([Contribution 2 Permalink]), ..., [Contribution N Title]([Contribution N Permalink])
  - [Focused summary highlighting the common technical area, primary goals, and relevance for potential job providers and GitHub profile readers]

Replace the placeholders with the actual contribution titles, permalinks, and your focused summary.
`;

const summarize = async (contributions: repoContribution) => {
  const repo = contributions.repository;
  const contributionsList = contributions.contributions;
  const repoInfo = `Repository: ${repo.name}\nStargazers: ${repo.stargazerCount}\nURL: ${repo.url}\n\n`;
  const prompt = contributionsList
    .map((contribution: contribution) => {
      return `Title: ${contribution.title}\nDescription: ${contribution.description}\nPermalink: ${contribution.permalink}\n`;
    })
    .join('\n');

  console.log('Querying OpenAI to generate summary for repo: ', repo.name);
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: promptTmpl,
      },
      {
        role: 'user',
        content: repoInfo + prompt,
      },
    ],
  });
  console.log('Summary generated for repo: ', repo.name);
  return response.choices[0].message.content;
};

export default summarize;
