const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN; //for multiple requests

export const searchUsers = async (enteredUser) => {
	const response = await fetch(`${GITHUB_URL}/search/users?q=${enteredUser}`, {
		headers: {
			Authorization: `token ${GITHUB_TOKEN}`,
		},
	});

	if (!response.ok) {
		throw new Error('Could not connect to the Github api');
	}

	const { items } = await response.json();

	return items;
};

export const getUser = async (searchedUser) => {
	const response = await fetch(`${GITHUB_URL}/users/${searchedUser}`, {
		headers: {
			Authorization: `token ${GITHUB_TOKEN}`,
		},
	});

	if (!response.ok) {
		throw new Error('Could not connect to the Github api');
	}

	if (response.status === 404) {
		window.location('/notfound');
		return;
	}

	const data = await response.json();

	return data;
};

export const getRepos = async (searchedUser) => {
	const params = new URLSearchParams({
		sort: 'created',
		per_page: 10,
	});

	const response = await fetch(`${GITHUB_URL}/users/${searchedUser}/repos?${params}`, {
		headers: {
			Authorization: `token ${GITHUB_TOKEN}`,
		},
	});

	if (!response.ok) {
		throw new Error('Could not connect to the Github api');
	}

	if (response.status === 404) {
		window.location('/notfound');
		return;
	}

	const data = await response.json();

	return data;
};
