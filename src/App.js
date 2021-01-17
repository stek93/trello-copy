import React from 'react';

import Header from './components/Header';
import SideBar from './components/SideBar';

function App() {
	return (
		<>
			<Header />
			<div>
				<SideBar />
				<main>LISTA BOARD-ova</main>
			</div>
		</>
	);
}

export default App;
