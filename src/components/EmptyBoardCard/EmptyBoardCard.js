import React from 'react';

import styles from './EmptyBoardCard.module.scss';

export default function EmptyBoardCard() {
	return (
		<div className={styles.container}>
			<div className={styles.image} />
			<div className={styles.additional}>
				<h3>Stay on track and up to date</h3>
				<p>
					Invite people to boards and cards, leave comments, add due dates, and we&apos;ll
					show the most important activity here.
				</p>
			</div>
		</div>
	);
}
