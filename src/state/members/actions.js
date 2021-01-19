import { createAction } from 'redux-actions';

export const ActionTypes = {
	USER_DATA: '@JS/USER_DATA'
};

export const userData = createAction(ActionTypes.USER_DATA);
