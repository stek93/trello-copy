import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { ReactComponent as CloseIcon } from 'static/img/icon-close.svg';
import { ReactComponent as AddNewIcon } from 'static/img/icon-add-new.svg';

import useBoards from 'hooks/useBoards';

import styles from './AddNewCardList.module.scss';

export function AddNewCard({ isSingleCard }) {
	const [activeCard, setActiveCard] = useState(false);

	return (
		<div className={styles.container}>
			{!activeCard ? (
				<button
					type='button'
					onClick={() => setActiveCard(true)}
					className={cn(styles.add_new_cta, styles.cta_card)}
				>
					<div>
						<AddNewIcon />
					</div>
					{`${isSingleCard ? 'Add a card' : 'Add another card'}`}
				</button>
			) : (
				<form>
					<div className={styles.compose_name}>
						<textarea
							className={cn(styles.entity_name, styles.card_name)}
							placeholder='Enter a title for this card...'
							autoFocus
						/>
					</div>
					<div className={styles.footer}>
						<button type='submit'>Add Card</button>
						<div
							className={styles.close}
							onClick={() => setActiveCard(false)}
							role='presentation'
						>
							<CloseIcon />
						</div>
					</div>
				</form>
			)}
		</div>
	);
}

export function AddNewList({ boardId, lastListPosition }) {
	const { register, handleSubmit } = useForm();
	const { createBoardList } = useBoards();

	const [activeList, setActiveList] = useState(false);

	const onSubmit = data => {
		data.pos = lastListPosition * 2;
		createBoardList(boardId, data);
		setActiveList(false);
	};

	return (
		<div className={cn(styles.container, styles.container_list)}>
			{!activeList ? (
				<button
					type='button'
					onClick={() => setActiveList(true)}
					className={cn(styles.add_new_cta, styles.cta_list)}
				>
					<div>
						<AddNewIcon />
					</div>
					Add another list
				</button>
			) : (
				<div className={styles.list_form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={cn(styles.compose_name, styles.compose_name_list)}>
							<input
								ref={register}
								name='name'
								type='text'
								className={cn(styles.entity_name, styles.list_name)}
								placeholder='Enter list title...'
								autoFocus
							/>
						</div>
						<div className={styles.footer}>
							<button type='submit'>Add List</button>
							<div
								className={styles.close}
								onClick={() => setActiveList(false)}
								role='presentation'
							>
								<CloseIcon />
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
