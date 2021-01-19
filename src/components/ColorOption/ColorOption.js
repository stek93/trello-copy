import React from 'react';

import { ReactComponent as CheckIcon } from 'static/img/icon-check.svg';

import styles from './ColorOption.module.scss';

export default function ColorOption({ color, selectColor, active }) {
	const styleColorOption = {
		backgroundColor: color
	};

	return (
		<div
			className={styles.option}
			style={styleColorOption}
			onClick={() => selectColor(color)}
			role='presentation'
		>
			{active === color && <CheckIcon />}
		</div>
	);
}
