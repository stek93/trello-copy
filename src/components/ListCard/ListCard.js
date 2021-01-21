import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ListCard.module.scss';

export default function ListCard({ name }) {
	return (
		<Link to='nnn' className={styles.link}>
			<div className={styles.card}>
				<span>{name}</span>
			</div>
		</Link>
	);
}
