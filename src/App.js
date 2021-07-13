import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';

import ProtectedRoute from './helpers/protectedRoute';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
	const { user } = useAuthListener();

	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<p>Loading...</p>}>
					<Switch>
						<Route path={ROUTES.LOGIN} component={Login} />
						<Route path={ROUTES.SIGN_UP} component={SignUp} />
						<ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
							<Dashboard />
						</ProtectedRoute>
						<Route path={ROUTES.PROFILE} component={Profile} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
