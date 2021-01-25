import React, { useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';

import styles from './CommentSection.module.scss';

const CommentSectionDefaultProps = {
	isEmpty: false
};

export default function CommentSection({ isEmpty, initials, name, text, onSubmit }) {
	const { handleSubmit, register } = useForm();

	const [commentFocused, setCommentFocused] = useState(false);
	const [editComment, setEditComment] = useState(false);
	const [comment, setComment] = useState('');
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
						onBlur={() => setCommentFocused(false)}
						role='presentation'
					>
						<form onSubmit={handleSubmit(onSubmit)}>
							<textarea
								ref={register}
								name='text'
								placeholder='Write a comment...'
								value={comment}
								onChange={e => setComment(e.target.value)}
							/>
							{commentFocused && (
								<button
									type='submit'
									className={cn(
										styles.save_button,
										comment.length
											? styles.save_button_enabled
											: styles.save_button_disabled
									)}
								>
									Save
								</button>
							)}
						</form>
					</div>
				</div>
			) : (
				<div
					className={cn(styles.comment, styles.comment_list)}
					role='presentation'
					onBlur={() => setEditComment(false)}
				>
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
									<span>Delete</span>
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
								<form onSubmit={handleSubmit(onSubmit)}>
									<textarea
										ref={register}
										name='text'
										placeholder='Write a comment...'
										defaultValue={text}
										onChange={e => setComment(e.target.value)}
									/>
									{editComment && (
										<button
											type='submit'
											className={cn(
												styles.save_button,
												text.length
													? styles.save_button_enabled
													: styles.save_button_disabled
											)}
										>
											Save
										</button>
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
