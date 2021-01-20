import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useBoards from 'hooks/useBoards';

import CardList from 'components/CardList';
import styles from './Board.module.scss';

export default function Board() {
	const { id } = useParams();
	const { loadBoardById, boardDetails } = useBoards();

	const styleBoard = {
		backgroundImage: `url(${boardDetails?.backgroundImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundColor: boardDetails?.backgroundColor
	};

	useEffect(() => {
		if (id) loadBoardById(id);
	}, [id]);

	return (
		<div className={styles.board} style={styleBoard}>
			<div className={styles.stripe}>
				<button type='button'>NESTO</button>
			</div>
			<div className={styles.list_container}>
				{boardDetails.lists.map(list => (
					<CardList name={list.name} />
				))}
			</div>
		</div>
	);
}
