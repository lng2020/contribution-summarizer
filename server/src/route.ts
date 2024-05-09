import express from 'express';
import { graphql, GraphQlQueryResponseData } from '@octokit/graphql';
import generateSummary from './summary';

const router = express.Router();

router.post('/generate-summary', async (req, res) => {
  try {
    const { username, starNumbers, date, excludeRepos, includeRepos } = req.body;

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
                  permalink
                }
              }
            }
            repository {
              name
              stargazerCount
              url
            }
          }
        }
      }
    }`;

    let results: contributionByRepository[];
    try {
      console.log('Fetching data from GitHub');
      const gh_token = process.env.GITHUB_TOKEN;
      const response = (await graphql(query, {
        username: username,
        headers: {
          authorization: 'bearer ' + gh_token,
        },
      })) as GraphQlQueryResponseData;
      results = response.user.contributionsCollection.pullRequestContributionsByRepository;
      console.log('Data fetched from GitHub');
    } catch (e) {
      console.log('Cannot fetch data from GitHub: ', e);
      return res.status(500).json({ e: 'Cannot fetch data from GitHub: ' + e });
    }

    console.log('Filtering data');
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

    const contributions = filteredResults
      .map((result: contributionByRepository) => {
        return {
          repository: result.repository,
          contributions: result.contributions.nodes
            .filter((node: node) => {
              const createdAt = new Date(node.pullRequest.createdAt);
              const dateDate = new Date(date);
              return createdAt > dateDate;
            })
            .map((node: node) => {
              return {
                title: node.pullRequest.title,
                description: node.pullRequest.body,
                permalink: node.pullRequest.permalink,
              };
            }),
        } as repoContribution;
      })
      .filter((contribution: repoContribution) => contribution.contributions.length > 0);

    console.log('Data filtered, generating summary');
    await generateSummary(new Date(date), contributions, res);
  } catch (e) {
    console.log('Error while generating summary: ', e);
    res.status(500).json({ e: 'Error while generating summary: ' + e });
  }
});

export default router;
