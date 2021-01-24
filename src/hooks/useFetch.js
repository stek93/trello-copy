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

	const fetchAll = async (services, params, onSuccess, onFailure) => {
		setLoading(true);

		try {
			const response = await Promise.all([
				services.forEach((service, index) => service(params[index]))
			]);

			setLoading(false);
			setData(response.map(res => res?.data));

			if (onSuccess) onSuccess(response);
		} catch (e) {
			setLoading(false);
			setError(e);

			if (onFailure) onFailure(e);
		}
	};

	return { fetch, fetchAll, data, error, isLoading };
}
