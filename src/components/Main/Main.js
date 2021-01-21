import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BoardList from '../BoardList';
import Board from '../Board';
import styles from './Main.module.scss';

export default function Main() {
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
