import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import useMembers from 'hooks/useMembers';

import BoardList from '../BoardList';
import Board from '../Board';
import styles from './Main.module.scss';

export default function Main() {
	const { loadUserData } = useMembers();

	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<main className={styles.main}>
			<Switch>
				<Route exact path='/'>
					<BoardList />
				</Route>
				<Route path='/board/:id'>
					<Board />
				</Route>
			</Switch>
		</main>
	);
}
