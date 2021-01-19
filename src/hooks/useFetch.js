import { useState } from 'react';

export default function useFetch() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const fetch = async (service, params, onSuccess, onFailure) => {
		setLoading(true);

		try {
			const response = await service(params);

			setLoading(false);
			setData(response.data);

			if (onSuccess) onSuccess(response);
		} catch (e) {
			setLoading(false);
			setError(e);

			if (onFailure) onFailure(e);
		}
	};

	return { fetch, data, error, isLoading };
}
