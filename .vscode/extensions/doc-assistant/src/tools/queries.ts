import * as vscode from 'vscode';
import { graphql } from '@octokit/graphql';
import { graphql as GraphqlClient } from '@octokit/graphql/dist-types/types';

export interface Issue {
	readonly number: string;
	readonly summary: string;
	readonly description: string;
	readonly url: string;
	readonly labels: string[];
	readonly comments: string[];
}

export interface ReleaseFeature extends Issue {
	readonly related: Issue[];
}

const ISSUE_FIELDS = `
fragment IssueFields on Issue {
  number
  title
  body
  url
  labels(first: 10) {
    nodes {
      name
    }
  }
  comments(first: 10) {
	 nodes {
	 	body
	  }
	}
}`;

const GET_ISSUES_REQUESTS = `
${ISSUE_FIELDS}
query ($repositoryQuery: String!, $after: String) {
  search(type: ISSUE, query: $repositoryQuery, first: 100, after: $after) {
    edges {
      node {
        ... on Issue {
          ...IssueFields
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;

interface QueryResult {
	search: {
		edges: Array<{
			node: {
				number: string;
				title: string;
				body: string;
				url: string;
				labels: {
					nodes: Array<{
						name: string;
					}>;
				};
				comments: {
					nodes: Array<{
						body: string;
					}>;
				};
			};
		}>;
		pageInfo: {
			hasNextPage: boolean;
			endCursor: string;
		};
	};
}

export async function getReleaseFeatures(milestoneName: string): Promise<ReleaseFeature[]> {
	try {
		const gqlClient = await gql();
		const releaseFeatures: ReleaseFeature[] = [], onTestPlan: Issue[] = [];

		const result = await gqlClient<QueryResult>(GET_ISSUES_REQUESTS, {
			repositoryQuery: `repo:microsoft/vscode repo:microsoft/vscode-copilot milestone:"${milestoneName}" label:feature-request assignee:@me`,
			after: null
		});

		for (const edge of result.search.edges) {
			const issue = toIssue(edge);
			if (issue.labels.includes('*duplicate')) {
				continue
			}
			if (issue.labels.includes('*out-of-scope')) {
				continue
			}
			if (issue.labels.includes('on-testplan')) {
				onTestPlan.push(issue);
			} else {
				releaseFeatures.push({ ...issue, related: [] });
			}
		}

		releaseFeatures.unshift(...await getReleaseFeaturesWithTestPlanItems(milestoneName, onTestPlan, gqlClient));

		return releaseFeatures;

	} catch (error) {
		console.error('Error fetching release items:', error);
		throw error;
	}
}

async function getReleaseFeaturesWithTestPlanItems(milestoneName: string, onTestPlan: Issue[], gqlClient: GraphqlClient): Promise<ReleaseFeature[]> {

	const releaseFeatures: ReleaseFeature[] = []

	const result = await gqlClient<QueryResult>(GET_ISSUES_REQUESTS, {
		repositoryQuery: `repo:microsoft/vscode milestone:"${milestoneName}" label:testplan-item author:@me`,
		after: null
	});

	for (const edge of result.search.edges) {
		const releaseFeature: ReleaseFeature = {
			...toIssue(edge),
			related: []
		};
		releaseFeature.related.push(...await getIssuesFiledAgainst(edge.node.number, gqlClient));
		for (const issue of onTestPlan) {
			if (releaseFeature.description.indexOf(issue.number) !== -1) {
				releaseFeature.related.push(issue);
			}
		}
		releaseFeatures.push(releaseFeature);
	}

	return releaseFeatures;
}

async function getIssuesFiledAgainst(testPlanItem: string, gqlClient: GraphqlClient): Promise<Issue[]> {
	try {
		const result = await gqlClient<QueryResult>(GET_ISSUES_REQUESTS, {
			repositoryQuery: `repo:microsoft/vscode is:closed Testing ${testPlanItem}`,
			after: null
		});

		return result.search.edges.map(edge => toIssue(edge));

	} catch (error) {
		console.error('Error fetching issues:', error);
		throw error;
	}
}

function toIssue(edge: any): Issue {
	return {
		number: edge.node.number,
		summary: edge.node.title,
		description: edge.node.body,
		url: edge.node.url,
		labels: edge.node.labels.nodes.map((label: any) => label.name),
		comments: edge.node.comments.nodes.map((comment: any) => comment.body)
	};
}

async function gql(): Promise<GraphqlClient> {
	const session = await vscode.authentication.getSession('github', ['read:user', 'user:email', 'repo'], {
		createIfNone: true
	});

	if (!session) {
		throw new Error('Failed to get GitHub authentication session');
	}

	return graphql.defaults({
		headers: {
			authorization: `Bearer ${session.accessToken}`,
		},
	});;
}