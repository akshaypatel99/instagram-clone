import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
	return (
		<Router>
			<Suspense fallback={<p>Loading...</p>}>
				<Switch>
					<Route path={ROUTES.LOGIN} component={Login} exact />
					<Route path={ROUTES.SIGN_UP} component={SignUp} exact />
					<Route component={NotFound} />
				</Switch>
			</Suspense>
		</Router>
	);
}

export default App;
