import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Header = () => {
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);
	return (
		<div>
			<h1>Header</h1>
		</div>
	);
};

export default Header;
