import Axios from 'axios';

import apiURL from './constants';

const instance = (() => {
	const axios = Axios.create({
		baseURL: apiURL,
		params: {
			key: process.env.REACT_APP_TRELLO_API_KEY,
			token: process.env.REACT_APP_TRELLO_TOKEN
		}
	});

	const get = (url, params) => axios.get(url, { params });

	const post = (url, params) => axios.post(url, { params });

	const patch = (url, params) => axios.patch(url, { params });

	const put = (url, params) => axios.put(url, { params });

	const del = (url, params) => axios.delete(url, { params });

	return {
		get,
		post,
		patch,
		put,
		del
	};
})();

export default instance;
