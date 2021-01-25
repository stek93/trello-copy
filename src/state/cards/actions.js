import { createAction } from 'redux-actions';

export const ActionTypes = {
	GET_CARD: '@JS/GET_CARD',
	GET_CARD_LIST: '@JS/GET_CARD_LIST',
	GET_CARD_COMMENTS: '@JS/GET_CARD_COMMENTS'
};

export const getCard = createAction(ActionTypes.GET_CARD);
export const getCardList = createAction(ActionTypes.GET_CARD_LIST);
export const getCardComments = createAction(ActionTypes.GET_CARD_COMMENTS);
