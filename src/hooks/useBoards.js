import { useDispatch, useSelector } from 'react-redux';

import {
	getBoards as getBoardsAction,
	getBoard as getBoardAction,
	getBoardInit as initBoardAction
} from 'state/boards/actions';
import {
	getBoards as getBoardsService,
	postBoard as postBoardService,
	getBoardDetailsBatch as getBoardDetailsService,
	putBoard as putBoardService,
	postList as postListService,
	putList as putListService
} from 'utils/services';

import useFetch from './useFetch';

const useBoards = () => {
	const dispatch = useDispatch();
	const { fetch, isLoading, error } = useFetch();
	const {
		boards: { fetchedBoards, fetchedBoardDetails },
		members: { user }
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
		fetch(postBoardService, data, onSuccess, err => console.log(err));
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
		fetch(
			putBoardService,
			{ boardID: boardId, data },
			() => loadBoardById(boardId),
			err => console.log(err)
		);

	const createBoardList = (boardId, data) =>
		fetch(
			postListService,
			{ boardID: boardId, data },
			() => loadBoardById(boardId),
			err => console.log(err)
		);

	const updateBoardList = (boardId, listId, data) =>
		fetch(
			putListService,
			{ listID: listId, data },
			() => loadBoardById(boardId),
			err => console.log(err)
		);

	return {
		fetchBoards,
		createNewBoard,
		loadBoardById,
		initBoardDetails,
		updateBoard,
		createBoardList,
		updateBoardList,
		isLoading,
		error,
		boards,
		boardDetails
	};
};

export default useBoards;
