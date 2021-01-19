import React, { useState } from 'react';

import { ReactComponent as CloseIcon } from 'static/img/icon-close.svg';

import { boardColors } from 'utils/constants';

import ColorOption from 'components/ColorOption';
import styles from './AddNewBoard.module.scss';

export default function AddNewBoard({ close }) {
	const [selectedColor, setSelectedColor] = useState(boardColors.blue);
	const [name, setName] = useState('');

	const currentBoardColor = {
		backgroundColor: selectedColor
	};

	return (
		<div className={styles.container}>
			<div className={styles.overlay} onClick={close} role='presentation' />
			<div className={styles.wrapper}>
				<form>
					<div className={styles.board_options}>
						<div className={styles.board} style={currentBoardColor}>
							<input
								type='text'
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
								<ColorOption
									key={key}
									color={value}
									selectColor={color => setSelectedColor(color)}
									active={selectedColor}
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
