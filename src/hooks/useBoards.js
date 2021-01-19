import { useDispatch, useSelector } from 'react-redux';

import { getBoards as getBoardsAction } from 'state/boards/actions';
import { getBoards } from 'utils/services';

import useFetch from './useFetch';

const useBoards = () => {
	const dispatch = useDispatch();
	const { fetch, isLoading, error } = useFetch();
	const {
		boards: { fetchedBoards }
	} = useSelector(store => store);

	const fetchBoards = userID => {
		fetch(
			getBoards,
			{ userID },
			({ data }) => dispatch(getBoardsAction(data)),
			err => dispatch(getBoardsAction(err))
		);
	};

	const boards = (!fetchedBoards.error && fetchedBoards.boards) || [];

	return {
		fetchBoards,
		isLoading,
		error,
		boards
	};
};

export default useBoards;
