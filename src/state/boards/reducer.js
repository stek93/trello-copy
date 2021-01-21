import produce from 'immer';
import { combineReducers } from 'redux';
import { handleAction, handleActions } from 'redux-actions';

import { ActionTypes } from './actions';

const initialState = {
	boards: [],
	board: {
		id: null,
		description: null,
		name: null,
		backgroundColor: null,
		backgroundImage: null,
		lists: {}
	}
};

const fetchedBoards = handleAction(
	ActionTypes.GET_BOARDS,
	(state, action) => {
		const { payload, error = null } = action;

		return produce(state, draft => {
			if (!error) {
				draft.boards = payload.map(board => ({
					id: board.id,
					name: board.name,
					slug: board.shortLink,
					description: board.desc,
					backgroundImage: board.prefs?.backgroundImage || '',
					backgroundColor: board.prefs?.backgroundColor || ''
				}));
			}

			draft.error = error;
		});
	},
	{ boards: initialState.boards }
);

const fetchedBoardDetails = handleActions(
	{
		[ActionTypes.GET_BOARD]: (state, action) => {
			const { payload, error = null } = action;
			const [req1, req2, req3] = payload;

			const board = Object.values(req1)[0];
			const lists = Object.values(req2)[0];
			const cards = Object.values(req3)[0];

			return produce(state, draft => {
				if (!error) {
					draft.board.id = board.id;
					draft.board.description = board.desc;
					draft.board.name = board.name;
					draft.board.backgroundColor = board.prefs?.backgroundColor || '';
					draft.board.backgroundImage = board.prefs?.backgroundImage || '';
					draft.board.lastListPosition = lists[lists.length - 1].pos;
					const listsObj = {};
					lists.forEach(list => {
						listsObj[list.id] = {
							id: list.id,
							name: list.name,
							position: list.pos,
							cards: []
						};
					});

					draft.board.lists = listsObj;
					cards.forEach(card => {
						draft.board.lists[card.idList].cards.push({
							id: card.id,
							description: card.desc,
							name: card.name,
							position: card.pos
						});
					});
				}

				draft.error = error;
			});
		},
		[ActionTypes.BOARD_INIT]: (state, action) =>
			produce(state, draft => {
				draft.board = initialState.board;
				draft.error = null;
			})
	},
	{
		board: initialState.board
	}
);

export default combineReducers({
	fetchedBoards,
	fetchedBoardDetails
});
