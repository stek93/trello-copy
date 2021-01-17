import React from 'react';
import cn from 'classnames';

import { ReactComponent as HomeIcon } from '../../static/img/icon-home.svg';
import MenuItem from './components/MenuItem';
import SearchField from './components/SearchField';
import Boards from './components/Boards';
import NewBoard from './components/NewBoard';
import Info from './components/Info';
import Profile from './components/Profile';
import Logo from '../Logo';

import styles from './Header.module.scss';

export default function Header() {
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
					<MenuItem>
						<NewBoard />
					</MenuItem>
					<MenuItem>
						<Info />
					</MenuItem>
					<MenuItem className={styles.profile}>
						<Profile />
					</MenuItem>
				</ul>
			</nav>
		</header>
	);
}
