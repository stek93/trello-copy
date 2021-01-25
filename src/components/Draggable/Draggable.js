import React, { useRef, useState } from 'react';
import _ from 'lodash';
import { arrayOf, func, string, shape } from 'prop-types';

const DROPPABLE_ZONE = 'droppable-zone';

const DraggablePropTypes = {
	component: func.isRequired,
	elements: arrayOf(shape({ id: string })).isRequired,
	setElements: func.isRequired,
	changeElementPosition: func.isRequired
};

export default function Draggable({
	component: Component,
	elements,
	setElements,
	changeElementPosition,
	...rest
}) {
	const listCopy = useRef();
	listCopy.current = _.cloneDeep(elements);

	const [inDropZone, setInDropZone] = useState(false);

	const dragStart = e => {
		e.dataTransfer.effectAllowed = 'move';
		const sourceItem = {
			...e.currentTarget.dataset,
			index: Number(e.currentTarget.dataset.index)
		};

		e.dataTransfer.setData('sourceItem', JSON.stringify(sourceItem));
	};

	const dragEnter = e => {
		if (e.target.getAttribute('data-content') === DROPPABLE_ZONE) {
			setInDropZone(true);
		}
	};

	const dragLeave = e => {
		if (e.target.getAttribute('data-content') === DROPPABLE_ZONE) {
			setInDropZone(false);
		}
	};

	const dragOver = e => {
		e.preventDefault();
	};

	const onDrop = e => {
		const sourceItem = JSON.parse(e.dataTransfer.getData('sourceItem'));

		// first child represents drag content
		const targetItem = {
			...e.currentTarget.firstChild.dataset,
			index: Number(e.currentTarget.firstChild.dataset.index)
		};

		setInDropZone(false);

		console.log(sourceItem, targetItem, listCopy);
		if (sourceItem.index === targetItem.index) return;

		listCopy.current.splice(
			targetItem.index,
			0,
			listCopy.current.splice(sourceItem.index, 1)[0]
		);
		setElements(listCopy.current);

		changeElementPosition(sourceItem, targetItem);
	};

	return (
		<Component
			onDragStart={dragStart}
			onDragOver={dragOver}
			onDragEnter={dragEnter}
			onDragLeave={dragLeave}
			onDrop={onDrop}
			inDropZone={inDropZone}
			{...rest}
		/>
	);
}

Draggable.propTypes = DraggablePropTypes;
