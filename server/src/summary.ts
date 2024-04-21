import summarize from "./openai";

const generateSummary = (contributions: any) => {
    let summaryTmpl = `
## Contribution Summary
`;
    for (let i = 0; i < contributions.length; i++) {
        const contribution = contributions[i];
        const summarizedContent = summarize(contribution);
        summaryTmpl += `
### ${contribution.title}
${summarizedContent}
`;
    }
    return summaryTmpl;
}


export default generateSummary;