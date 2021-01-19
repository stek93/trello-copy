import { useDispatch, useSelector } from 'react-redux';

import { getBoards as getBoardsAction } from 'state/boards/actions';
import { getBoards as getBoardsService, postBoard as postBoardService } from 'utils/services';

import useFetch from './useFetch';

const useBoards = () => {
	const dispatch = useDispatch();
	const { fetch, isLoading, error } = useFetch();
	const {
		boards: { fetchedBoards },
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

	const boards = (!fetchedBoards.error && fetchedBoards.boards) || [];

	return {
		fetchBoards,
		createNewBoard,
		isLoading,
		error,
		boards
	};
};

export default useBoards;
