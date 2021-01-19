import produce from 'immer';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { ActionTypes } from './actions';

const initialState = {
	user: {
		id: null,
		fullName: null,
		email: null,
		initials: null,
		username: null,
		boards: []
	}
};

const user = handleActions(
	{
		[ActionTypes.USER_DATA]: (state, action) => {
			const { payload, error = null } = action;

			return produce(state, draft => {
				if (!error) {
					draft.id = payload.id;
					draft.fullName = payload.fullName;
					draft.email = payload.email;
					draft.initials = payload.initials;
					draft.username = payload.username;
					draft.boards = payload.idBoards;
				}

				draft.error = error;
			});
		}
	},
	{ ...initialState.user }
);

export default combineReducers({
	user
});
