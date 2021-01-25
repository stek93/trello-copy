import React, { useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import useBoards from 'hooks/useBoards';

import { ReactComponent as CloseIcon } from 'static/img/icon-close.svg';

import styles from './CommentSection.module.scss';

const CommentSectionDefaultProps = {
	isEmpty: false
};

export default function CommentSection({ isEmpty, commentId, initials, name, text }) {
	const { handleSubmit, register, watch, reset } = useForm();
	const { createComment, updateComment, deleteComment } = useBoards();
	const { cardId } = useParams();

	const [commentFocused, setCommentFocused] = useState(false);
	const [editComment, setEditComment] = useState(false);

	const watchComment = watch('text', '');

	const submitNewComment = data => {
		createComment(cardId, data);
		reset({ text: '' });
		setCommentFocused(false);
	};

	const submitEditedComment = data => {
		updateComment(cardId, commentId, data);
		setEditComment(false);
	};

	return (
		<>
			{isEmpty ? (
				<div className={styles.comment}>
					<div className={styles.user}>
						<div className={styles.user_initials}>{initials}</div>
					</div>
					<div
						className={cn(
							styles.input_field,
							commentFocused ? styles.input_field_focused : ''
						)}
						onFocus={() => setCommentFocused(true)}
						role='presentation'
					>
						<form onSubmit={handleSubmit(submitNewComment)}>
							<textarea ref={register} name='text' placeholder='Write a comment...' />
							{commentFocused && (
								<div className={styles.actions}>
									<button
										type='submit'
										className={cn(
											styles.save_button,
											watchComment.length
												? styles.save_button_enabled
												: styles.save_button_disabled
										)}
									>
										Save
									</button>
									<div
										className={styles.close}
										onClick={() => setCommentFocused(false)}
										role='presentation'
									>
										<CloseIcon />
									</div>
								</div>
							)}
						</form>
					</div>
				</div>
			) : (
				<div className={cn(styles.comment, styles.comment_list)}>
					<div className={styles.user}>
						<div className={styles.user_initials}>{initials}</div>
					</div>
					<div className={styles.commenting_section}>
						<div className={styles.user_name}>{name}</div>
						{!editComment ? (
							<div className={styles.comment_info}>
								<p>{text}</p>
								<div className={styles.comment_actions}>
									<span onClick={() => setEditComment(true)} role='presentation'>
										Edit
									</span>
									<span
										onClick={() => deleteComment(cardId, commentId)}
										role='presentation'
									>
										Delete
									</span>
								</div>
							</div>
						) : (
							<div
								className={cn(
									styles.input_field,
									styles.input_field_edit,
									editComment ? styles.input_field_edit_focused : ''
								)}
							>
								<form onSubmit={handleSubmit(submitEditedComment)}>
									<textarea
										ref={register}
										name='text'
										placeholder='Write a comment...'
										defaultValue={text}
									/>
									{editComment && (
										<div className={styles.actions}>
											<button
												type='submit'
												className={cn(
													styles.save_button,
													watchComment.length
														? styles.save_button_enabled
														: styles.save_button_disabled
												)}
											>
												Save
											</button>
											<div
												className={styles.close}
												onClick={() => setEditComment(false)}
												role='presentation'
											>
												<CloseIcon />
											</div>
										</div>
									)}
								</form>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}

CommentSection.defaultProps = CommentSectionDefaultProps;
