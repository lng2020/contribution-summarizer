import OpenAI from 'openai';

const openai = new OpenAI();

const promptTmpl = `
I will provide you GitHub PR/Issue title and description.
You should summarize this GitHub contribution into 2~3 sentence.
`

const summarize = async (contributions: any) => {
    const prompt = contributions.map((contribution: any) => {
        return `Title: ${contribution.title}\nDescription: ${contribution.description}\n`;
    }).join('\n');
    
    const response = await openai.chat.completions.create({
        model: 'davinci',
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
    console.log(response.choices[0].message.content);
}

export default summarize;