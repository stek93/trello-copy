import React, { useEffect } from 'react';
import { Switch, useParams, useRouteMatch, Route } from 'react-router-dom';

import useBoards from 'hooks/useBoards';

import { AddNewList } from 'components/AddNewCardList';
import CardList from 'components/CardList';
import CardDetails from 'components/CardDetails';
import EditableField from 'components/EditableField';
import styles from './Board.module.scss';

export default function Board() {
	const { path } = useRouteMatch();
	const { id } = useParams();
	const { loadBoardById, boardDetails, updateBoard } = useBoards();

	const styleBoard = {
		backgroundImage: `url(${boardDetails?.backgroundImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundColor: boardDetails?.backgroundColor
	};

	const onSubmit = data => {
		updateBoard(boardDetails.id, data);
	};

	useEffect(() => {
		if (id) loadBoardById(id);
	}, [id]);

	return (
		<div className={styles.board} style={styleBoard}>
			<div className={styles.stripe}>
				<EditableField
					value={boardDetails.name}
					name='name'
					onSubmit={onSubmit}
					inputHasSize
				/>
			</div>
			<div className={styles.list_container}>
				{Object.values(boardDetails.lists).map(list => (
					<CardList key={list.id} boardId={boardDetails.id} list={list} />
				))}
				<AddNewList boardId={id} lastListPosition={boardDetails.lastListPosition} />
			</div>
			<Switch>
				<Route path={`${path}/card/:cardId`}>
					<CardDetails />
				</Route>
			</Switch>
		</div>
	);
}
