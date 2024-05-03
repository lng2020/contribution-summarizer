interface contribution {
  title: string;
  description: string;
  permalink: string;
}

interface repoContribution {
  repository: repository;
  contributions: contribution[];
}

interface pullRequest {
  title: string;
  body: string;
  createdAt: string;
  permalink: string;
}

interface node {
  pullRequest: pullRequest;
}

interface repository {
  name: string;
  stargazerCount: number;
  url: string;
}

interface contributionByRepository {
  repository: repository;
  contributions: {
    nodes: node[];
  };
}
