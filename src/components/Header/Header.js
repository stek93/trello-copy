import React, { useState } from 'react';
import cn from 'classnames';

import { ReactComponent as HomeIcon } from 'static/img/icon-home.svg';
import { ReactComponent as NewBoardIcon } from 'static/img/icon-add-new.svg';

import AddNewBoard from 'components/AddNewBoard';
import MenuItem from './components/MenuItem';
import SearchField from './components/SearchField';
import Boards from './components/Boards';
import Info from './components/Info';
import Profile from './components/Profile';
import Logo from '../Logo';

import styles from './Header.module.scss';

export default function Header() {
	const [showNewBoard, setShowNewBoard] = useState(false);

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<ul className={styles.nav_list}>
					<MenuItem href='/' isNavigation>
						<HomeIcon />
					</MenuItem>
					<Boards />
					<SearchField />
				</ul>
				<Logo className={styles.logo} />
				<ul className={cn(styles.nav_list, styles.right_alignment)}>
					<MenuItem onClick={() => setShowNewBoard(true)}>
						<NewBoardIcon />
					</MenuItem>
					<MenuItem>
						<Info />
					</MenuItem>
					<MenuItem className={styles.profile}>
						<Profile />
					</MenuItem>
				</ul>
			</nav>
			{showNewBoard && <AddNewBoard close={() => setShowNewBoard(false)} />}
		</header>
	);
}
