import { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Timeline from './Timeline';

const Dashboard = () => {
	useEffect(() => {
		document.title = 'Instagram';
	}, []);
	return (
		<div className='bg-gray-background'>
			<Header />
			<div className='grid'>
				<Timeline />
				<Sidebar />
			</div>
		</div>
	);
};

export default Dashboard;
