import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import NotFound from './components/pages/NotFound';

function App() {
	return (
		<Router>
			<div className='flex flex-col justify-between h-screen'>
				<NavBar />
				<main className='container mx-auto px-13 pb-12'>
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
							path='*'
							element={<NotFound />}
						/>
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
