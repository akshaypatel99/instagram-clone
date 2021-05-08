import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';

const Timeline = () => {
	const { photos } = usePhotos();

	return (
		<div className='container col-span-2'>
			<p>Timeline</p>
		</div>
	);
};

export default Timeline;
