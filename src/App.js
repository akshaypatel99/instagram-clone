import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';

import ProtectedRoute from './helpers/protectedRoute';
import IsUserLoggedIn from './helpers/isUserLoggedIn';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
	const { user } = useAuthListener();

	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<p>Loading...</p>}>
					<Switch>
						<IsUserLoggedIn
							user={user}
							loggedInPath={ROUTES.DASHBOARD}
							path={ROUTES.LOGIN}
						>
							<Login />
						</IsUserLoggedIn>
						<IsUserLoggedIn
							user={user}
							loggedInPath={ROUTES.DASHBOARD}
							path={ROUTES.SIGN_UP}
						>
							<SignUp />
						</IsUserLoggedIn>
						<ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
							<Dashboard />
						</ProtectedRoute>
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
