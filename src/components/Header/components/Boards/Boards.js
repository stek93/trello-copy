import React, { useState } from 'react';
import cn from 'classnames';

import { ReactComponent as BoardsIcon } from 'static/img/icon-boards.svg';

import MenuItem from '../MenuItem';
import styles from './Boards.module.scss';

export default function Boards() {
	const [menuActive, setMenuActive] = useState(false);

	const classBoards = cn({
		[styles.boards]: true
	});

	return (
		<MenuItem className={classBoards}>
			<button type='button' className={styles.button_container}>
				<span>
					<BoardsIcon />
				</span>
				<span className={styles.label}>Boards</span>
			</button>
		</MenuItem>
	);
}
