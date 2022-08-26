import React, { Fragment } from 'react';

import UserResults from '../users/UserResults';
import UserSearch from '../users/UserSearch';

const HomePage = () => {
	return (
		<Fragment>
			<UserSearch />
			<UserResults />
		</Fragment>
	);
};

export default HomePage;
