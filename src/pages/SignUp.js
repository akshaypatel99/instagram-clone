import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

const SignUp = () => {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [fullName, setFullName] = useState('');

	const [error, setError] = useState('');
	const isInvalid = password === '' || emailAddress === '';

	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);

	const signupHandler = async (e) => {
		e.preventDefault();

		const usernameExists = await doesUsernameExist(username);
		if (!usernameExists) {
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);

				await createdUserResult.user.updateProfile({
					displayName: username,
				});

				await firebase.firestore().collection('users').add({
					userId: createdUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: emailAddress.toLowerCase(),
					following: [],
					dateCreated: Date.now(),
				});

				history.push(ROUTES.DASHBOARD);
			} catch (error) {
				setUsername('');
				setFullName('');
				setEmailAddress('');
				setPassword('');
				setError(error.message);
			}
		} else {
			setError('Username is already taken, please choose another');
		}
	};

	useEffect(() => {
		document.title = 'Login - Instagram';
	}, []);

	return (
		<div className='container flex mx-auto max-w-screen-md items-center h-screen'>
			<div className='flex w-3/5'>
				<img
					src='/images/iphone-with-profile.jpg'
					alt='iPhone with Instagram app'
				/>
			</div>
			<div className='flex flex-col w-2/5'>
				<div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
					<h1 className='flex justify-center w-full'>
						<img
							src='/images/logo.png'
							alt='Instagram'
							className='mt-2 w-6/12 mb-4'
						/>
					</h1>
					{error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

					<form method='POST' onSubmit={signupHandler}>
						<input
							type='text'
							aria-label='Enter your username'
							placeholder='Username'
							className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
						<input
							type='text'
							aria-label='Enter your full name'
							placeholder='Full Name'
							className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
							onChange={(e) => setFullName(e.target.value)}
							value={fullName}
						/>
						<input
							type='text'
							aria-label='Enter your email address'
							placeholder='Email address'
							className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
							onChange={(e) => setEmailAddress(e.target.value)}
							value={emailAddress}
						/>

						<input
							type='password'
							aria-label='Enter your password'
							placeholder='Password'
							className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>

						<button
							disabled={isInvalid}
							type='submit'
							className={`bg-blue-medium text-white w-full rounded font-bold h-8 ${
								isInvalid && `opacity-50`
							}`}
						>
							Sign Up
						</button>
					</form>
				</div>
				<div className='flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
					<p className='text-sm'>
						Have an account?{` `}
						<Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
