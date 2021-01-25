import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { arrayOf, string, shape, number } from 'prop-types';

import { ReactComponent as DragIcon } from 'static/img/icon-drag.svg';

import useBoards from 'hooks/useBoards';

import ListCard from 'components/ListCard/ListCard';
import { AddNewCard } from 'components/AddNewCardList';
import styles from './CardList.module.scss';

const CardListPropTypes = {
	name: string,
	cards: arrayOf(
		shape({
			id: string,
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

export default function CardList({ boardId, list }) {
	const { updateBoardList } = useBoards();

	const [showOverflowMenu, setShowOverflowMenu] = useState(false);
	const { handleSubmit, register } = useForm();

	const { name, cards } = list;

	const onSubmit = data => {
		updateBoardList(boardId, list.id, data);
	};

	return (
		<div className={styles.list_wrapper}>
			<div className={styles.content}>
				<div className={styles.list_header}>
					<form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
						<input
							ref={register}
							type='text'
							name='name'
							defaultValue={name}
							className={styles.input_area}
						/>
					</form>
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
						<ListCard key={card.id} id={card.id} name={card.name} />
					))}
				</div>
				<div className={styles.list_footer}>
					<AddNewCard
						boardId={boardId}
						listId={list.id}
						isSingleCard={cards?.length <= 1}
					/>
					<div className={styles.drag_button}>
						<DragIcon />
					</div>
				</div>
			</div>
		</div>
	);
}

CardList.propTypes = CardListPropTypes;
CardList.defaultProps = CardListDefaultProps;
