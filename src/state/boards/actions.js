import { createAction } from 'redux-actions';

export const ActionTypes = {
	GET_BOARDS: '@JS/GET_BOARDS',
	GET_BOARD: '@JS/GET_BOARD',
	BOARD_INIT: '@JS/BOARD_INIT'
};

export const getBoards = createAction(ActionTypes.GET_BOARDS);

export const getBoard = createAction(ActionTypes.GET_BOARD);
export const getBoardInit = createAction(ActionTypes.BOARD_INIT);
