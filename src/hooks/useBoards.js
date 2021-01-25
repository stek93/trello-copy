import { useDispatch, useSelector } from 'react-redux';

import {
	getBoards as getBoardsAction,
	getBoard as getBoardAction,
	getBoardInit as initBoardAction
} from 'state/boards/actions';
import { getCard as getCardAction, getCardList as getCardListAction } from 'state/cards/actions';
import {
	getBoards as getBoardsService,
	postBoard as postBoardService,
	getBoardDetailsBatch as getBoardDetailsService,
	putBoard as putBoardService,
	postList as postListService,
	putList as putListService,
	getCardDetailsBatch as getCardDetailsService,
	postCard as postCardService,
	getList as getListService
} from 'utils/services';

import useFetch from './useFetch';

const useBoards = () => {
	const dispatch = useDispatch();
	const { fetch, fetchAll, isLoading, error } = useFetch();
	const {
		boards: { fetchedBoards, fetchedBoardDetails },
		members: { user },
		cards: { fetchedCardDetails, fetchedCardList }
	} = useSelector(store => store);

	const fetchBoards = () => {
		fetch(
			getBoardsService,
			{ userID: user.id },
			({ data }) => dispatch(getBoardsAction(data)),
			err => dispatch(getBoardsAction(err))
		);
	};

	const createNewBoard = ({ data, onSuccess }) => {
		fetch(postBoardService, data, onSuccess);
	};

	const loadBoardById = id => {
		fetch(
			getBoardDetailsService,
			{ boardID: id },
			({ data }) => dispatch(getBoardAction(data)),
			err => dispatch(getBoardAction(err))
		);
	};

	const boards = (!fetchedBoards.error && fetchedBoards.boards) || [];

	const boardDetails = !fetchedBoardDetails.error && fetchedBoardDetails.board;

	const initBoardDetails = () => dispatch(initBoardAction());

	const updateBoard = (boardId, data) =>
		fetch(putBoardService, { boardID: boardId, data }, () => loadBoardById(boardId));

	const createBoardList = (boardId, data) =>
		fetch(postListService, { boardID: boardId, data }, () => loadBoardById(boardId));

	const updateBoardList = (boardId, listId, data) =>
		fetch(putListService, { listID: listId, data }, () => loadBoardById(boardId));

	const moveLists = (boardId, listA, listB) => {
		const positionTo = listB.pos;
		const positionFrom = listA.pos;

		listA.pos = positionTo;
		listB.pos = positionFrom;

		fetchAll(
			[putListService, putListService],
			[
				{
					listID: listA.id,
					data: {
						pos: listA.pos
					}
				},
				{
					listID: listB.id,
					data: {
						pos: listB.pos
					}
				}
			]
		);
	};

	const loadListById = listId => {
		fetch(getListService, { listID: listId }, ({ data }) => dispatch(getCardListAction(data)));
	};

	const loadCardById = cardId => {
		fetch(getCardDetailsService, { cardID: cardId }, ({ data }) => {
			loadListById(data.idList);
			dispatch(getCardAction(data));
		});
	};

	const cardDetails = !fetchedCardDetails.error && fetchedCardDetails.card;

	const cardListDetails = !fetchedCardList.error && fetchedCardList.list;

	const createListCard = (boardId, data) => {
		fetch(postCardService, data, () => loadBoardById(boardId));
	};

	return {
		fetchBoards,
		createNewBoard,
		loadBoardById,
		initBoardDetails,
		updateBoard,
		createBoardList,
		updateBoardList,
		createListCard,
		loadCardById,
		moveLists,
		isLoading,
		error,
		boards,
		cardDetails,
		cardListDetails,
		boardDetails
	};
};

export default useBoards;
