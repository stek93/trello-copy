import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { ReactComponent as CloseIcon } from 'static/img/icon-close.svg';
import { ReactComponent as AddNewIcon } from 'static/img/icon-add-new.svg';

import useBoards from 'hooks/useBoards';

import styles from './AddNewCardList.module.scss';

export function AddNewCard({ boardId, listId, isSingleCard }) {
	const { register, handleSubmit } = useForm();
	const [activeCard, setActiveCard] = useState(false);
	const { createListCard } = useBoards();

	const onSubmit = data => {
		data.idList = listId;
		createListCard(boardId, data);
		setActiveCard(false);
	};

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
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.compose_name}>
						<textarea
							ref={register}
							name='name'
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

export function AddCardDescription({ onSubmit, description }) {
	const { register, handleSubmit } = useForm();

	const [activeDescription, setActiveDescription] = useState(false);

	const classAddCardDescription = cn({
		[styles.container]: true,
		[styles.container_list]: true,
		[styles.description]: true
	});

	const classButton = cn({
		[styles.add_new_cta]: true,
		[styles.cta_list]: true,
		[styles.description_button]: true
	});

	const classInput = cn({
		[styles.compose_name]: true,
		[styles.compose_name_list]: true,
		[styles.description_input]: true
	});

	const onFormSubmit = data => {
		onSubmit(data);
		setActiveDescription(false);
	};

	return (
		<div className={classAddCardDescription}>
			{!activeDescription ? (
				<button
					type='button'
					onClick={() => setActiveDescription(true)}
					className={classButton}
				>
					{description || 'Add a more detailed description...'}
				</button>
			) : (
				<div className={cn(styles.list_form, styles.list_form_description)}>
					<form onSubmit={handleSubmit(onFormSubmit)}>
						<div className={classInput}>
							<textarea
								ref={register}
								name='desc'
								type='text'
								defaultValue={description}
								className={cn(styles.entity_name, styles.list_name)}
								placeholder='Add a more detailed description...'
								autoFocus
							/>
						</div>
						<div className={styles.footer}>
							<button type='submit'>Save</button>
							<div
								className={styles.close}
								onClick={() => setActiveDescription(false)}
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
