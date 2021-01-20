import qs from 'qs';

import * as service from './service';

// USER related services
export const getUserData = () => service.get(`members/me/`);
// ---------------------

// BOARD related services
export const postBoard = params => service.post(`boards?${qs.stringify(params)}`);
export const getBoards = ({ userID }) => service.get(`members/${userID}/boards`);
export const getBoard = ({ boardID }) => service.get(`boards/${boardID}`);
export const getBoardDetailsBatch = ({ boardID }) =>
	service.get(`batch/?urls=/boards/${boardID},/boards/${boardID}/lists`);
// ----------------------

// BATCH service
export const getBatchData = urls => service.get(`batch/?urls=${urls}`);
// -------------
