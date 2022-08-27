import React, { useContext } from 'react';

import Spinner from '../layout/Spinner';

import GithubContext from '../../context/github/github-context';
import UserItem from './UserItem';

const UserResults = () => {
	const { users, isLoading } = useContext(GithubContext);

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
