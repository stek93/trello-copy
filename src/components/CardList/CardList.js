import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { arrayOf, string, shape, number } from 'prop-types';

import { ReactComponent as DragIcon } from 'static/img/icon-drag.svg';

import useBoards from 'hooks/useBoards';

import Draggable from 'components/Draggable';
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

export default function CardList({ boardId, list, inDropZone, onDragStart, index, ...rest }) {
	const { updateBoardList } = useBoards();

	const [showOverflowMenu, setShowOverflowMenu] = useState(false);
	const { handleSubmit, register } = useForm();

	const { name, cards } = list;

	const [cardLists, setCardLists] = useState(cards);

	useEffect(() => {
		if (cards) setCardLists(cards);
	}, [cards]);

	const classCardList = cn({
		[styles.list_wrapper]: true,
		[styles.drop_zone_active]: inDropZone
	});

	const onSubmit = data => {
		updateBoardList(boardId, list.id, data);
	};

	const changeCardPosition = (sourceCard, targetCard) => {};

	return (
		<div className={classCardList} data-content='droppable-zone' {...rest}>
			<div
				className={styles.content}
				draggable='true'
				data-content='draggable-content'
				onDragStart={onDragStart}
				data-id={list.id}
				data-index={index}
				data-pos={list.position}
			>
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
					{cardLists.map((card, i) => (
						<Draggable
							component={ListCard}
							elements={cardLists}
							setElements={setCardLists}
							changeElementPosition={changeCardPosition}
							key={card.id}
							card={card}
							index={i}
						/>
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
