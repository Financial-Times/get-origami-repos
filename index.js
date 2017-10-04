#!/usr/bin/env node
(async () => {
	'use strict';

	const GitHubApi = require('github');

	// Configuration
	const origamiCoreTeamId = 1959619;

	// Check that a GitHub token is available
	const githubAuthToken = process.env.GITHUB_AUTH_TOKEN;
	if (!githubAuthToken) {
		process.exitCode = 1;
		return console.error('Please provide a GITHUB_AUTH_TOKEN environment variable');
	}

	// Create a GitHub API client
	const github = new GitHubApi();
	github.authenticate({
		type: 'oauth',
		token: githubAuthToken
	});

	// Get the Origami team repos and topics
	let origamiTeamRepos;
	try {
		origamiTeamRepos = await getOrigamiTeamRepos();
		await Promise.all(origamiTeamRepos.map(async repo => {
			const response = await github.repos.getTopics({
				owner: repo.owner.login,
				repo: repo.name,
				per_page: 100 // TODO only gets the first page at the moment
			});
			repo.topics = response.data.names;
		}));
	} catch (error) {
		process.exitCode = 1;
		return console.error(error);
	}

	// Output
	const repoJson = JSON.stringify(origamiTeamRepos.map(simplifyRepoObject), null, '\t');
	console.log(repoJson);

	// Function to fetch all of the repositories owned by the Origami team
	async function getOrigamiTeamRepos(page = 1, repos = []) {

		const response = await github.orgs.getTeamRepos({
			id: origamiCoreTeamId,
			page,
			per_page: 100
		});
		repos = repos.concat(response.data);

		if (github.hasNextPage(response)) {
			return getOrigamiTeamRepos(page + 1, repos);
		}
		return repos;
	}

	// Simplify a repo object returned by the GitHub API
	function simplifyRepoObject(repo) {
		return {
			name: repo.name,
			admin: repo.permissions.admin,
			topics: repo.topics,
			urls: {
				web: repo.html_url,
				cloneGit: repo.git_url,
				cloneHttps: repo.clone_url
			}
		};
	}

})();
