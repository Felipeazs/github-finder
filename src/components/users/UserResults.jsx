import React, { useEffect, useState } from 'react';

import Spinner from '../layout/Spinner';

import UserItem from './UserItem';

const UserResults = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetchUsersGitHubApi();
	}, []);

	const fetchUsersGitHubApi = async () => {
		setIsLoading(true);
		const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
			},
		});

		if (!response.ok) {
			throw new Error('Could not connect to the Github api');
		}

		const data = await response.json();

		setIsLoading(false);
		setUsers(data);
	};

	const usersList = !isLoading ? (
		users.map((user) => (
			<UserItem
				key={user.id}
				user={user}
			/>
		))
	) : (
		<Spinner />
	);

	return (
		<div className='grid grid-cold-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
			{usersList}
		</div>
	);
};

export default UserResults;
