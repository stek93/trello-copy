import produce from 'immer';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { ActionTypes } from './actions';

const initialState = {
	boards: []
};

const fetchedBoards = handleActions(
	{
		[ActionTypes.GET_BOARDS]: (state, action) => {
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
		}
	},
	{ ...initialState.boards }
);

export default combineReducers({
	fetchedBoards
});
