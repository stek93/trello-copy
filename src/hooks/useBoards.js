import { useDispatch, useSelector } from 'react-redux';

import {
	getBoards as getBoardsAction,
	getBoard as getBoardAction,
	getBoardInit as initBoardAction
} from 'state/boards/actions';
import {
	getBoards as getBoardsService,
	postBoard as postBoardService,
	getBoardDetailsBatch as getBoardDetailsService
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

	return {
		fetchBoards,
		createNewBoard,
		loadBoardById,
		initBoardDetails,
		isLoading,
		error,
		boards,
		boardDetails
	};
};

export default useBoards;
