import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
	baseURL: GITHUB_URL,
	//headers: {...}
});

export const searchUsers = async (enteredUser) => {
	const response = await github.get(`/search/users?q=${enteredUser}`);

	if (response.status !== 200) {
		throw new Error('Could not connect to database');
	}

	const { items } = response.data;

	return items;
};

export const getUserAndRepos = async (searchedUser) => {
	const params = new URLSearchParams({
		sort: 'created',
		per_page: 10,
	});

	const [user, repos] = await Promise.all([
		github.get(`/users/${searchedUser}`),
		github.get(`/users/${searchedUser}/repos?${params}`),
	]);

	if (user.status !== 200 || repos.status !== 200) {
		throw new Error('Could not connect to the Github api');
	}

	if (user.status === 404 || repos.status === 404) {
		window.location('/notfound');
		return;
	}

	const userData = user.data;
	const reposData = repos.data;

	return { userData, reposData };
};
