import React, { useState, useEffect } from 'react';
import { Switch, useParams, useRouteMatch, Route, useHistory } from 'react-router-dom';

import useBoards from 'hooks/useBoards';

import { ReactComponent as WarningIcon } from 'static/img/icon-warning.svg';

import { AddNewList } from 'components/AddNewCardList';
import CardList from 'components/CardList';
import CardDetails from 'components/CardDetails';
import EditableField from 'components/EditableField';
import Draggable from 'components/Draggable';
import styles from './Board.module.scss';

export default function Board() {
	const history = useHistory();
	const { path } = useRouteMatch();
	const { id } = useParams();
	const { loadBoardById, boardDetails, updateBoard, moveLists, deleteBoard } = useBoards();

	const [boardLists, setBoardLists] = useState([]);

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

	const changeListPosition = (sourceList, targetList) => {
		moveLists(id, sourceList, targetList);
	};

	useEffect(() => {
		if (id) loadBoardById(id);
	}, [id]);

	useEffect(() => {
		if (boardDetails) setBoardLists(Object.values(boardDetails.lists));
	}, [boardDetails]);

	return (
		<div className={styles.board} style={styleBoard}>
			<div className={styles.stripe}>
				<EditableField
					value={boardDetails.name}
					name='name'
					onSubmit={onSubmit}
					inputHasSize
				/>
				<button
					type='button'
					className={styles.delete_button}
					onClick={() => deleteBoard(id, () => history.goBack())}
				>
					<WarningIcon />
					Delete
				</button>
			</div>
			<div className={styles.list_container}>
				{boardLists?.map((list, index) => (
					<Draggable
						component={CardList}
						elements={boardLists}
						setElements={setBoardLists}
						changeElementPosition={changeListPosition}
						key={list.id}
						boardId={boardDetails.id}
						list={list}
						index={index}
					/>
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
