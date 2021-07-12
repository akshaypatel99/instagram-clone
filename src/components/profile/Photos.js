import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Photos = ({ photos }) => {
	return (
		<div>
			<h1>Photos</h1>
		</div>
	);
};

export default Photos;

Photos.propTypes = {
	photos: PropTypes.array,
};
