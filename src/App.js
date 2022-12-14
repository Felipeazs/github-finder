import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GithubProvider } from './context/github/github-context';
import { AlertProvider } from './context/alert/alert-context';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import NotFound from './components/pages/NotFound';
import UserPage from './components/pages/UserPage';
import Alert from './components/layout/Alert';

function App() {
	return (
		<GithubProvider>
			<AlertProvider>
				<Router>
					<div className='flex flex-col justify-between h-screen'>
						<NavBar />
						<main className='container mx-auto px-13 pb-12'>
							<Alert />
							<Routes>
								<Route
									path='/'
									element={<HomePage />}
								/>
								<Route
									path='/about'
									element={<AboutPage />}
								/>
								<Route
									path='/user/:username'
									element={<UserPage />}
								/>
								<Route
									path='*'
									element={<NotFound />}
								/>
								<Route
									path='/notfound'
									element={<NotFound />}
								/>
							</Routes>
						</main>
						<Footer />
					</div>
				</Router>
			</AlertProvider>
		</GithubProvider>
	);
}

export default App;
