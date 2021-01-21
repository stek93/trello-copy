import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import useBoards from 'hooks/useBoards';

import { AddNewList } from 'components/AddNewCardList';
import CardList from 'components/CardList';
import styles from './Board.module.scss';

export default function Board() {
	const { id } = useParams();
	const { loadBoardById, boardDetails, updateBoard } = useBoards();
	const { handleSubmit, register } = useForm();

	const [boardNameFocus, setBoardNameFocus] = useState(false);

	const styleBoard = {
		backgroundImage: `url(${boardDetails?.backgroundImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundColor: boardDetails?.backgroundColor
	};

	const onSubmit = data => {
		updateBoard(boardDetails.id, data);
		setBoardNameFocus(false);
	};

	useEffect(() => {
		if (id) loadBoardById(id);
	}, [id]);

	return (
		<div className={styles.board} style={styleBoard}>
			<div className={styles.stripe}>
				<div>
					{!boardNameFocus ? (
						<h1
							onClick={() => setBoardNameFocus(true)}
							role='presentation'
							className={styles.board_name}
						>
							{boardDetails.name}
						</h1>
					) : (
						<form onBlur={handleSubmit(onSubmit)} onSubmit={handleSubmit(onSubmit)}>
							<input
								ref={register}
								type='text'
								name='name'
								size={boardDetails.name.length}
								onBlur={() => setBoardNameFocus(false)}
								defaultValue={boardDetails.name}
								className={styles.input_name}
								autoFocus
							/>
						</form>
					)}
				</div>
			</div>
			<div className={styles.list_container}>
				{Object.values(boardDetails.lists).map(list => (
					<CardList key={list.id} boardId={boardDetails.id} list={list} />
				))}
				<AddNewList boardId={id} lastListPosition={boardDetails.lastListPosition} />
			</div>
		</div>
	);
}
