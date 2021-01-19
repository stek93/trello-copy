import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { ReactComponent as CloseIcon } from 'static/img/icon-close.svg';

import useBoards from 'hooks/useBoards';
import { boardColors } from 'utils/constants';

import ColorOption from 'components/ColorOption';
import styles from './AddNewBoard.module.scss';

export default function AddNewBoard({ close }) {
	const { handleSubmit, register, control } = useForm();
	const { createNewBoard, fetchBoards } = useBoards();

	const [selectedColor, setSelectedColor] = useState(boardColors.blue);
	const [name, setName] = useState('');

	const currentBoardColor = {
		backgroundColor: selectedColor
	};

	const onSubmit = formData => {
		createNewBoard({
			data: formData,
			onSuccess: () => {
				fetchBoards();
				close();
			}
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.overlay} onClick={close} role='presentation' />
			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.board_options}>
						<div className={styles.board} style={currentBoardColor}>
							<input
								ref={register}
								type='text'
								name='name'
								className={styles.input}
								placeholder='Add board title'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<div className={styles.close} onClick={close} role='presentation'>
								<CloseIcon />
							</div>
						</div>
						<ul className={styles.color_palette}>
							{Object.entries(boardColors).map(([key, value]) => (
								<Controller
									key={key}
									name='prefs_background'
									control={control}
									render={({ onChange }) => (
										<ColorOption
											colorName={key}
											color={value}
											selectColor={(color, colorName) => {
												onChange(colorName);
												setSelectedColor(color);
											}}
											active={selectedColor}
										/>
									)}
								/>
							))}
						</ul>
					</div>
					<button type='submit' className={styles.button} disabled={!name.length}>
						Create Board
					</button>
				</form>
			</div>
		</div>
	);
}
