import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import styles from './ListCard.module.scss';

export default function ListCard({ id, name }) {
	const { url } = useRouteMatch();
	return (
		<Link to={`${url}/card/${id}`} className={styles.link}>
			<div className={styles.card}>
				<span>{name}</span>
			</div>
		</Link>
	);
}
