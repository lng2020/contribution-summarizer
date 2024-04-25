import express from 'express';
import { graphql, GraphQlQueryResponseData, GraphqlResponseError } from "@octokit/graphql";
import generateSummary from './summary.ts';

const router = express.Router();

router.post('/generate-summary', async (req, res) => {
  try {
    const { username, starNumbers, contributionType, timeRange, excludeRepos, includeRepos } = req.body;

    const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          pullRequestContributionsByRepository{
            contributions(first: 100) {
              nodes {
                pullRequest {
                  title
                  body
                  createdAt
                }
              }
            }
            repository {
              stargazerCount
            }
          }
        }
      }
    }`;

    const processedContributions: GraphQlQueryResponseData = [];
    try {
      const response = await graphql(query, {
        username: username,
        headers: {
          authorization: `token dummy_token`,
        }
      });
      processedContributions.push(response);
    } catch (e) {
      console.error('Error fetching contributions:', e);
    }

    const result = processedContributions[0].user.contributionsCollection.pullRequestContributionsByRepository;
    const filteredResult = result.filter((repo: any) => {
      const repoName = repo.repository.name;
      if (excludeRepos && excludeRepos.includes(repoName)) {
        return false;
      }
      if (includeRepos && !includeRepos.includes(repoName)) {
        return false;
      }
      if (starNumbers && repo.repository.stargazerCount < starNumbers) {
        return false;
      }
      return true;
    });
    const contributions = filteredResult.map((repo: any) => {
      return repo.contributions.nodes.map((contribution: any) => {
        return {
          title: contribution.pullRequest.title,
          description: contribution.pullRequest.body,
        };
      });
    });
    console.log('Contributions:', contributions);
    res.status(200).json({ summary: generateSummary(contributions)});
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'An error occurred while generating the summary' });
  }
});

export default router;