import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

const Login = () => {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState('');
	const isInvalid = password === '' || emailAddress === '';

	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);

	const loginHandler = () => {};

	useEffect(() => {
		document.title = 'Login - Instagram';
	}, []);

	return (
		<div className='container flex mx-auto max-w-screen-md items-center h-screen'>
			<p>Login page</p>
		</div>
	);
};

export default Login;
