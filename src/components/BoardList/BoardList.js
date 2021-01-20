import React, { useEffect, useState } from 'react';

import useBoards from 'hooks/useBoards';
import useMembers from 'hooks/useMembers';

import BoardCard from 'components/BoardCard';
import EmptyBoardCard from 'components/EmptyBoardCard';
import AddNewBoard from 'components/AddNewBoard';

import styles from './BoardList.module.scss';

export default function BoardList() {
	const { fetchBoards, initBoardDetails, boards } = useBoards();
	const { user, userExists } = useMembers();

	const [showNewBoard, setShowNewBoard] = useState(false);

	useEffect(() => {
		initBoardDetails();
		if (userExists) fetchBoards();
	}, [user]);

	return (
		<div className={styles.board_list}>
			<div className={styles.container}>
				{boards.length > 0 && (
					<>
						{boards.map(board => (
							<BoardCard key={board.id} board={board} />
						))}
						<BoardCard
							key='empty'
							isNewCard
							onNewCardClick={() => setShowNewBoard(true)}
						/>
					</>
				)}
			</div>
			<div className={styles.empty_container}>{!boards.length && <EmptyBoardCard />}</div>
			{showNewBoard && <AddNewBoard close={() => setShowNewBoard(false)} />}
		</div>
	);
}
