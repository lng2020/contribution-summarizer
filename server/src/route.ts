import express from 'express';
import { graphql, GraphQlQueryResponseData} from "@octokit/graphql";
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

    let results: contributionByRepository[]; 
    try {
      // retrive GITHUB_TOKEN
      const gh_token = process.env.GITHUB_TOKEN
      const response = await graphql(query, {
        username: username,
        headers: {
          authorization: "bearer"+gh_token
        }
      }) as GraphQlQueryResponseData;
      results = response.user.contributionsCollection.pullRequestContributionsByRepository;
    } catch (e) {
      throw new Error('Error fetching data from GitHub');
    }

    const filteredResults = results.filter((result: contributionByRepository) => {
      const repoName = result.repository.name;
      if (excludeRepos && excludeRepos.includes(repoName)) {
        return false;
      }
      if (includeRepos && !includeRepos.includes(repoName)) {
        return false;
      }
      if (starNumbers && result.repository.stargazerCount < starNumbers) {
        return false;
      }
      return true;
    });

    const contributions = filteredResults.map((result: contributionByRepository) => {
      return result.contributions.nodes.map((node: node) => {
        return {
          title: node.pullRequest.title,
          description: node.pullRequest.body,
        };
      });
    });

    res.status(200).json({ summary: generateSummary(contributions)});
  } catch (error) {
    throw new Error('Error generating summary');
  }
});

export default router;