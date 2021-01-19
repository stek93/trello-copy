import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './BoardCard.module.scss';

export default function BoardCard({ board, isNewCard, onNewCardClick }) {
	const classBoardCard = cn({
		[styles.card]: true,
		[styles.new_card]: isNewCard
	});

	const styleBoardCard = {
		backgroundImage: `url(${board?.backgroundImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundColor: board?.backgroundColor
	};

	return (
		<>
			{isNewCard ? (
				<div className={classBoardCard} onClick={onNewCardClick} role='presentation'>
					<div className={styles.overlay} />
					<span>Create new board</span>
				</div>
			) : (
				<div className={classBoardCard} style={styleBoardCard}>
					<Link to={`/board/${board.slug}`}>
						<div className={styles.overlay} />
						<span>{board.name}</span>
					</Link>
				</div>
			)}
		</>
	);
}
