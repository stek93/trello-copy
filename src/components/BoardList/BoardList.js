import React, { useEffect } from 'react';

import useBoards from 'hooks/useBoards';
import useMembers from 'hooks/useMembers';

import BoardCard from 'components/BoardCard';
import EmptyBoardCard from 'components/EmptyBoardCard';

import styles from './BoardList.module.scss';

export default function BoardList() {
	const { fetchBoards, boards } = useBoards();
	const { user, userExists } = useMembers();

	useEffect(() => {
		if (userExists) fetchBoards(user.id);
	}, [user]);

	return (
		<div className={styles.board_list}>
			<div className={styles.container}>
				{boards.length > 0 && (
					<>
						{boards.map(board => (
							<BoardCard board={board} />
						))}
						<BoardCard isNewCard />
					</>
				)}
			</div>
			<div className={styles.empty_container}>
				{boards.length === 0 && <EmptyBoardCard />}
			</div>
		</div>
	);
}
