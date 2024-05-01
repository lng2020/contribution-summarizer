import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
  baseURL: process.env.OPENAI_PROXY ? process.env.OPENAI_PROXY : undefined,
});

const promptTmpl = `
I will provide you with a list of GitHub pull requests (PRs) or issues, each including a title and description. Your task is to summarize each contribution described in these PRs or issues in a single concise sentence, and format the summaries as a Markdown list.

When summarizing a contribution, please focus on the main purpose or objective of the contribution (e.g., fixing a bug, adding a new feature, improving performance, etc.), and briefly mention any specific changes or implementations made to achieve the objective.

Your summaries should be written in a clear, coherent, and easily understandable style. Avoid unnecessary technical jargon or acronyms unless they are essential and explained. The goal is to convey the essence of each contribution in a way that is accessible to both technical and non-technical readers.

Please format your response as a Markdown list, with each summary as a list item, like this:

- [Contribution 1 Summary]
- [Contribution 2 Summary]
- ...
- [Contribution N Summary]

Replace the placeholders with your actual summaries, and ensure that each list item starts with a hyphen (-) followed by a space.
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
