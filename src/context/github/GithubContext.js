import { createContext, useCallback, useReducer } from 'react';

import githubReducer from './GithubReducer';

const GithubContext = createContext({
	users: [],
	isLoading: Boolean,
	searchUsers: () => {},
	clearUsers: () => {},
});

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
//const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN; //for multiple requests

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		isLoading: false,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	const searchUsers = useCallback(async (enteredUser) => {
		dispatch({ type: 'SET_LOADING' });

		const response = await fetch(`${GITHUB_URL}/search/users?q=${enteredUser}`);

		if (!response.ok) {
			throw new Error('Could not connect to the Github api');
		}

		const { items } = await response.json();

		dispatch({ type: 'GET_USERS', payload: items });
	}, []);

	const clearUsers = () => {
		dispatch({ type: 'CLEAR_USERS' });
	};

	return (
		<GithubContext.Provider
			value={{ users: state.users, isLoading: state.isLoading, searchUsers, clearUsers }}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
