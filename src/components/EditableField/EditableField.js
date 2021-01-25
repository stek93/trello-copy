import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import styles from './EditableField.module.scss';

const EditableFieldDefaultProps = {
	inputHasSize: false
};

export default function EditableField({
	value,
	name,
	onSubmit,
	inputClass,
	className,
	headingClass,
	inputHasSize
}) {
	const { handleSubmit, register } = useForm();
	const [fieldFocus, setFieldFocus] = useState(false);

	const fieldClassName = cn({
		[className]: className
	});

	const headingClassName = cn({
		[styles.heading]: true,
		[headingClass]: headingClass
	});

	const inputClassName = cn({
		[styles.input]: true,
		[inputClass]: inputClass
	});

	const submitForm = data => {
		onSubmit(data);
		setFieldFocus(false);
	};

	return (
		<div className={fieldClassName}>
			{!fieldFocus ? (
				<h1
					onClick={() => setFieldFocus(true)}
					role='presentation'
					className={headingClassName}
				>
					{value}
				</h1>
			) : (
				<form onBlur={handleSubmit(submitForm)} onSubmit={handleSubmit(submitForm)}>
					<input
						ref={register}
						type='text'
						name={name}
						size={inputHasSize ? value.length : undefined}
						onBlur={() => setFieldFocus(false)}
						defaultValue={value}
						className={inputClassName}
						autoFocus
					/>
				</form>
			)}
		</div>
	);
}

EditableField.defaultProps = EditableFieldDefaultProps;
