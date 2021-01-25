import produce from 'immer';
import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

import { ActionTypes } from './actions';

const initialState = {
	card: {
		id: null,
		description: null,
		name: null,
		position: null,
		boardId: null,
		listId: null,
		comments: []
	},
	list: {
		name: null
	}
};

const fetchedCardDetails = handleAction(
	ActionTypes.GET_CARD,
	(state, action) => {
		const { payload, error = null } = action;
		const [req1, req2] = payload;

		const card = Object.values(req1)[0];
		const comments = Object.values(req2)[0];

		return produce(state, draft => {
			if (!error) {
				draft.card.id = card.id;
				draft.card.description = card.desc;
				draft.card.name = card.name;
				draft.card.position = card.pos;
				draft.card.boardId = card.idBoard;
				draft.card.listId = card.idList;

				draft.card.comments = comments
					.filter(comment => comment.type === 'commentCard')
					.map(comment => ({
						id: comment.id,
						text: comment.data.text,
						date: comment.date,
						userInitials: comment.memberCreator.initials,
						userName: comment.memberCreator.fullName
					}));
			}

			draft.error = error;
		});
	},
	{ card: initialState.card }
);

const fetchedCardList = handleAction(
	ActionTypes.GET_CARD_LIST,
	(state, action) => {
		const { payload, error = null } = action;

		return produce(state, draft => {
			if (!error) {
				draft.list.name = payload.name;
			}

			draft.error = error;
		});
	},
	{ list: initialState.list }
);

export default combineReducers({
	fetchedCardDetails,
	fetchedCardList
});
