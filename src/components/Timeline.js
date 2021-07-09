import { useContext } from 'react';
import UserContext from '../context/user';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';
import Post from './post/Post';

const Timeline = () => {
	const { user } = useContext(UserContext);
	const { photos } = usePhotos(user);
	console.log('photos', photos);
	return (
		<div className='container col-span-2'>
			{!photos ? (
				<Skeleton count={4} width={640} height={500} className='mb-5' />
			) : (
				photos.map((content) => <Post key={content.docId} content={content} />)
			)}
		</div>
	);
};

export default Timeline;
