import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { ReactComponent as HomeIcon } from 'static/img/icon-home.svg';
import { ReactComponent as NewBoardIcon } from 'static/img/icon-add-new.svg';

import useBoards from 'hooks/useBoards';
import useMembers from 'hooks/useMembers';

import AddNewBoard from 'components/AddNewBoard';
import MenuItem from './components/MenuItem';
import SearchField from './components/SearchField';
import Boards from './components/Boards';
import Info from './components/Info';
import Profile from './components/Profile';
import Logo from '../Logo';

import styles from './Header.module.scss';

const HEADER_DEFAULT_COLOR = '#026aa7';

export default function Header() {
	const { boardDetails } = useBoards();
	const { loadUserData, isLoading } = useMembers();

	const [showNewBoard, setShowNewBoard] = useState(false);

	const styleHeader = {
		backgroundColor: boardDetails?.backgroundColor || HEADER_DEFAULT_COLOR
	};

	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<header className={styles.header} style={styleHeader}>
			{!!boardDetails?.backgroundColor && <div className={styles.overlay} />}
			<nav className={styles.nav}>
				<ul className={styles.nav_list}>
					<MenuItem href='/' isNavigation>
						<HomeIcon />
					</MenuItem>
					<Boards />
					<SearchField />
				</ul>
				<Logo className={styles.logo} isLoading={isLoading} />
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
