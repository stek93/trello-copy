import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useBoards from 'hooks/useBoards';

import { ReactComponent as CardDetailsIcon } from 'static/img/icon-card-details.svg';
import { ReactComponent as CloseIcon } from 'static/img/icon-close.svg';
import { ReactComponent as DescriptionIcon } from 'static/img/icon-description.svg';
import { ReactComponent as CommentsIcon } from 'static/img/icon-comments.svg';

import { AddCardDescription } from 'components/AddNewCardList';
import EditableField from 'components/EditableField';
import styles from './CardDetails.module.scss';

export default function CardDetails() {
	const history = useHistory();
	const { cardId } = useParams();
	const { loadCardById, cardDetails, cardListDetails } = useBoards();

	const onSubmit = data => {
		console.log(data);
	};

	useEffect(() => {
		if (cardId) loadCardById(cardId);
	}, [cardId]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.overlay} onClick={() => history.goBack()} role='presentation' />
			<div className={styles.card_details}>
				<div className={styles.name}>
					<div className={styles.details_icon}>
						<CardDetailsIcon />
					</div>
					<EditableField
						value={cardDetails.name}
						name='name'
						onSubmit={onSubmit}
						className={styles.field}
						headingClass={styles.name_heading}
						inputClass={styles.name_input}
					/>
					<div
						className={styles.close}
						onClick={() => history.goBack()}
						role='presentation'
					>
						<CloseIcon />
					</div>
				</div>
				<div className={styles.card_list}>
					<p>in list {cardListDetails.name}</p>
				</div>
				<div className={styles.description}>
					<div className={styles.description_info}>
						<div className={styles.description_icon}>
							<DescriptionIcon />
						</div>
						<h3>Description</h3>
					</div>
					<div className={styles.description_add}>
						<AddCardDescription
							description={cardListDetails.description}
							onSubmit={onSubmit}
						/>
					</div>
				</div>
				<div className={styles.actions}>
					<button type='button' className={styles.delete_button}>
						Delete card
					</button>
				</div>
				<div className={styles.description_info}>
					<div className={styles.description_icon}>
						<CommentsIcon />
					</div>
					<h3>Activity</h3>
				</div>
			</div>
		</div>
	);
}
