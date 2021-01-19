import { createAction } from 'redux-actions';

export const ActionTypes = {
	GET_BOARDS: '@JS/GET_BOARDS'
};

export const getBoards = createAction(ActionTypes.GET_BOARDS);
