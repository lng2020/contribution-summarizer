import express from 'express';
import { graphql, GraphQlQueryResponseData, GraphqlResponseError } from "@octokit/graphql";
import generateSummary from './summary.ts';

const router = express.Router();

router.post('/generate-summary', async (req, res) => {
  try {
    const { username, starNumbers, contributionType, timeRange, excludeRepos, includeRepos } = req.body;

    const query = `
      query($username: String!, $contributionType: [IssueState!], $timeRange: DateTime!) {
        search(query: "author:$username type:$contributionType created:$timeRange", type: ISSUE, first: 100) {
          nodes {
            ... on Issue {
              title
              url
              repository {
                nameWithOwner
                stargazerCount
              }
            }
            ... on PullRequest {
              title
              url
              repository {
                nameWithOwner
                stargazerCount
              }
            }
          }
        }
      }
    `;

    const processedContributions: GraphQlQueryResponseData = [];
    try {
      const response = await graphql(query, {
        username,
        contributionType,
        timeRange,
      });
      processedContributions.push(response);
    } catch (e) {
      if (e instanceof GraphqlResponseError) {
        console.error('Error response:', e.response);
      }
    }

    for (let i = 0; i < processedContributions.length; i++) {
      const contribution = processedContributions[i];
      if (starNumbers) {
        contribution.nodes = contribution.nodes.filter((node: any) => {
          return node.repository.stargazerCount >= starNumbers;
        });
      }
      if (excludeRepos) {
        contribution.nodes = contribution.nodes.filter((node: any) => {
          return !excludeRepos.includes(node.repository.nameWithOwner);
        });
      }
      if (includeRepos) {
        contribution.nodes = contribution.nodes.filter((node: any) => {
          return includeRepos.includes(node.repository.nameWithOwner);
        });
      }
    }

    res.status(200).json({ summary: generateSummary(processedContributions)});
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'An error occurred while generating the summary' });
  }
});

export default router;