import { createContext, useReducer } from 'react';

import githubReducer from './github-reducer';

const GithubContext = createContext({
	users: [],
	user: {},
	repos: [],
	isLoading: Boolean,
});

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		isLoading: false,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	return (
		<GithubContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
