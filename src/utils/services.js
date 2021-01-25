import qs from 'qs';

import * as service from './service';

// USER related services
export const getUserData = () => service.get(`members/me/`);
// ---------------------

// BOARD related services
export const postBoard = params => service.post(`boards?${qs.stringify(params)}`);
export const getBoards = ({ userID }) => service.get(`members/${userID}/boards`);
export const getBoard = ({ boardID }) => service.get(`boards/${boardID}`);
export const putBoard = ({ boardID, data }) =>
	service.put(`boards/${boardID}?${qs.stringify(data)}`);
export const getBoardDetailsBatch = ({ boardID }) =>
	service.get(`batch/?urls=/boards/${boardID},/boards/${boardID}/lists,/boards/${boardID}/cards`);
// ----------------------

// LIST related services
export const postList = ({ boardID, data }) =>
	service.post(`boards/${boardID}/lists?${qs.stringify(data)}`);
export const putList = ({ listID, data }) => service.put(`lists/${listID}?${qs.stringify(data)}`);
export const getList = ({ listID }) => service.get(`lists/${listID}`);
// ---------------------

// CARD related services
export const getCard = ({ cardID }) => service.get(`cards/${cardID}`);
export const postCard = data => service.post(`cards?${qs.stringify(data)}`);
export const putCard = ({ cardID, data }) => service.put(`cards/${cardID}?${qs.stringify(data)}`);
export const deleteCard = ({ cardID }) => service.remove(`cards/${cardID}`);
export const getCardDetailsBatch = ({ cardID }) =>
	service.get(`batch/?urls=/cards/${cardID},/cards/${cardID}/actions`);
export const getCardComments = ({ cardID }) => service.get(`cards/${cardID}/actions`);
export const createCardComment = ({ cardID, text }) =>
	service.post(`cards/${cardID}/actions/comments?${qs.stringify(text)}`);
export const updateCardComment = ({ cardID, commentID, text }) =>
	service.put(`cards/${cardID}/actions/${commentID}/comments?${qs.stringify(text)}`);
export const deleteCardComment = ({ cardID, commentID }) =>
	service.remove(`cards/${cardID}/actions/${commentID}/comments`);
// ----------------------

// BATCH service
export const getBatchData = urls => service.get(`batch/?urls=${urls}`);
// -------------
