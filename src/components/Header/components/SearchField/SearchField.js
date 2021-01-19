import React, { useState } from 'react';
import cn from 'classnames';

import { ReactComponent as SearchIcon } from 'static/img/icon-search.svg';
import { ReactComponent as SearchOutsideIcon } from 'static/img/icon-search-outside.svg';
import { ReactComponent as CloseIcon } from 'static/img/icon-close.svg';

import MenuItem from '../MenuItem';
import styles from './SearchField.module.scss';

export default function SearchField() {
	const [focused, setFocused] = useState(false);

	const classSearchField = cn({
		[styles.field]: true,
		[styles.focused]: focused
	});

	return (
		<MenuItem
			className={classSearchField}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
		>
			<input type='text' />
			<span>
				{!focused ? (
					<SearchIcon />
				) : (
					<>
						<SearchOutsideIcon />
						<CloseIcon />
					</>
				)}
			</span>
		</MenuItem>
	);
}
