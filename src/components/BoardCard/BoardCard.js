import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './BoardCard.module.scss';

export default function BoardCard({ board, isNewCard }) {
	const classBoardCard = cn({
		[styles.card]: true,
		[styles.new_card]: isNewCard
	});

	let styleBoardCard = {};

	if (!isNewCard)
		styleBoardCard = {
			backgroundImage: `url(${board.backgroundImage})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundColor: board.backgroundColor
		};

	return (
		<div className={classBoardCard} style={styleBoardCard}>
			<Link to={`/board/${board?.slug}`}>
				<div className={styles.overlay} />
				<span>{!isNewCard ? `${board.name}` : 'Create new board'}</span>
			</Link>
		</div>
	);
}
