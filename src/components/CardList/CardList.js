import React, { useState } from 'react';
import { arrayOf, string, shape, number } from 'prop-types';

import ListCard from 'components/ListCard/ListCard';
import AddNewCard from 'components/AddNewCard';
import styles from './CardList.module.scss';

const CardListPropTypes = {
	name: string,
	cards: arrayOf(
		shape({
			id: number,
			description: string,
			name: string,
			position: number
		})
	)
};

const CardListDefaultProps = {
	name: '',
	cards: []
};

export default function CardList({ name, cards }) {
	const [showOverflowMenu, setShowOverflowMenu] = useState(false);

	return (
		<div className={styles.list_wrapper}>
			<div className={styles.content}>
				<div className={styles.list_header}>
					<input type='text' value={name} />
					<div
						className={styles.overflow_menu}
						onClick={() => setShowOverflowMenu(!showOverflowMenu)}
						role='presentation'
					>
						...
					</div>
				</div>
				<div className={styles.list_scroll}>
					{cards.map(card => (
						<ListCard name={card.name} />
					))}
				</div>
				<div className={styles.list_footer}>
					<AddNewCard isSingleCard={cards?.length <= 1} />
				</div>
			</div>
		</div>
	);
}

CardList.propTypes = CardListPropTypes;
CardList.defaultProps = CardListDefaultProps;
