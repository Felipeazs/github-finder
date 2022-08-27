import { createContext, useCallback, useReducer } from 'react';

import githubReducer from './github-reducer';

const GithubContext = createContext({
	users: [],
	isLoading: Boolean,
	searchUsers: (enteredUser) => {},
	getUser: (searchedUser) => {},
	getRepos: (searchedUser) => {},
	clearUsers: () => {},
});

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN; //for multiple requests

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		isLoading: false,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	const searchUsers = useCallback(async (enteredUser) => {
		dispatch({ type: 'SET_LOADING' });

		const response = await fetch(`${GITHUB_URL}/search/users?q=${enteredUser}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		});

		if (!response.ok) {
			throw new Error('Could not connect to the Github api');
		}

		const { items } = await response.json();

		dispatch({ type: 'GET_USERS', payload: items });
	}, []);

	const getUser = useCallback(async (searchedUser) => {
		dispatch({ type: 'SET_LOADING' });

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

		dispatch({ type: 'GET_USER', payload: data });
	}, []);

	const getRepos = useCallback(async (searchedUser) => {
		dispatch({ type: 'SET_LOADING' });

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

		dispatch({ type: 'GET_USER_REPOS', payload: data });
	}, []);

	const clearUsers = () => {
		dispatch({ type: 'CLEAR_USERS' });
	};

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				isLoading: state.isLoading,
				searchUsers,
				getUser,
				getRepos,
				clearUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
