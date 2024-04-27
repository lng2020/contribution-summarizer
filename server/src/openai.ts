import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
  baseURL: process.env.OPENAI_PROXY ? process.env.OPENAI_PROXY : undefined,
});

const promptTmpl = `
I will provide you GitHub PR/Issue title and description.
You should summarize this GitHub contribution into 2~3 sentence.
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
