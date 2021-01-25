import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import styles from './ListCard.module.scss';

export default function ListCard({ card, inDropZone, onDragStart, index, ...rest }) {
	const { url } = useRouteMatch();
	const { id, name, position } = card;

	return (
		<Link to={`${url}/card/${id}`} className={styles.link}>
			<div data-content='droppable-zone' {...rest}>
				<div
					className={styles.card}
					draggable='true'
					data-content='draggable-content'
					onDragStart={onDragStart}
					data-id={id}
					data-index={index}
					data-pos={position}
				>
					<span>{name}</span>
				</div>
			</div>
		</Link>
	);
}
