import React, { useState } from 'react';

import { ReactComponent as CloseIcon } from 'static/img/icon-close.svg';
import { ReactComponent as AddNewIcon } from 'static/img/icon-add-new.svg';

import styles from './AddNewCard.module.scss';

export default function AddNewCard({ isSingleCard }) {
	const [activeCard, setActiveCard] = useState(false);

	return (
		<div className={styles.add_new_card}>
			{!activeCard ? (
				<button
					type='button'
					onClick={() => setActiveCard(true)}
					className={styles.add_new_cta}
				>
					<div>
						<AddNewIcon />
					</div>
					{`${isSingleCard ? 'Add a card' : 'Add another card'}`}
				</button>
			) : (
				<form>
					<div className={styles.compose_card}>
						<textarea
							className={styles.card_name}
							placeholder='Enter a title for this card...'
						/>
					</div>
					<div className={styles.card_footer}>
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
