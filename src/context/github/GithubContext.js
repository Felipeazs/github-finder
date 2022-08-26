import { createContext, useState, useCallback } from 'react';

const GithubContext = createContext({
	users: [],
	isLoading: Boolean,
	fetchUsers: () => {},
});

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchUsers = useCallback(async () => {
		setIsLoading(true);
		const response = await fetch(`${GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		});

		if (!response.ok) {
			throw new Error('Could not connect to the Github api');
		}

		const data = await response.json();

		setIsLoading(false);
		setUsers(data);
	}, []);

	return (
		<GithubContext.Provider value={{ users, isLoading, fetchUsers }}>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
