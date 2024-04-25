interface contribution {
    title: String
    description: String
}

interface pullRequest {
    title: String
    body: String
    createdAt: String
}

interface node {
    pullRequest: pullRequest
}

interface repository {
    name: String
    stargazerCount: Number
}

interface contributionByRepository {
    repository: repository
    contributions: {
        nodes: node[]
    }
}