import PropTypes from 'prop-types';

const Post = ({ content }) => {
	return (
		<div>
			<p>Post</p>
		</div>
	);
};

export default Post;

Post.propTypes = {
	content: PropTypes.shape({
		username: PropTypes.string.isRequired,
		imageSrc: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
		docId: PropTypes.string.isRequired,
		userLikedPhoto: PropTypes.bool.isRequired,
		likes: PropTypes.array.isRequired,
		comments: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired,
	}),
};
