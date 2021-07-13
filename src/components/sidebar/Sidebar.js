import { useContext } from 'react';
import Suggestions from './Suggestions';
import User from './User';
import LoggedInUserContext from '../../context/loggedInUser';

const Sidebar = () => {
	const { user: { fullName, username, userId, following, docId } = {} } =
		useContext(LoggedInUserContext);
	return (
		<div className='p-4'>
			<User username={username} fullName={fullName} />
			<Suggestions
				userId={userId}
				following={following}
				loggedInUserDocId={docId}
			/>
		</div>
	);
};

export default Sidebar;
