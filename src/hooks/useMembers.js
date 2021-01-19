import { useDispatch, useSelector } from 'react-redux';

import { userData as userDataAction } from 'state/members/actions';
import { getUserData as getUserDataService } from 'utils/services';

import useFetch from './useFetch';

const useMembers = () => {
	const dispatch = useDispatch();
	const { fetch, isLoading, error } = useFetch();
	const {
		members: { user }
	} = useSelector(store => store);

	const loadUserData = () => {
		fetch(
			getUserDataService,
			null,
			({ data }) => dispatch(userDataAction(data)),
			err => dispatch(userDataAction(err))
		);
	};

	const userExists = !user.error && user.id;

	return {
		loadUserData,
		isLoading,
		error,
		user,
		userExists
	};
};

export default useMembers;
