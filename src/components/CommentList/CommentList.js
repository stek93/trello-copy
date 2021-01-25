import React from 'react';

import useBoards from 'hooks/useBoards';
import useMembers from 'hooks/useMembers';

import CommentSection from './components/CommentSection';
import styles from './CommentList.module.scss';

export default function CommentList() {
	const { cardDetails } = useBoards();
	const { user } = useMembers();

	return (
		<div className={styles.comment_list}>
			<CommentSection isEmpty initials={user.initials} name={user.fullName} />
			{cardDetails.comments.map(comment => (
				<CommentSection
					key={comment.id}
					commentId={comment.id}
					initials={comment.userInitials}
					name={comment.userName}
					text={comment.text}
				/>
			))}
		</div>
	);
}
