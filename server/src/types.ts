interface contribution {
  title: string;
  description: string;
}

interface repoContribution {
  repository: repository;
  contributions: contribution[];
}

interface pullRequest {
  title: string;
  body: string;
  createdAt: string;
}

interface node {
  pullRequest: pullRequest;
}

interface repository {
  name: string;
  stargazerCount: number;
}

interface contributionByRepository {
  repository: repository;
  contributions: {
    nodes: node[];
  };
}
