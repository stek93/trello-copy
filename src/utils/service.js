import Api from './apiClient';

export const get = async (url, data = {}) => {
	try {
		const response = await Api.get(url, data);
		return response;
	} catch (error) {
		throw error.response?.data.message;
	}
};

export const post = async (url, data = {}) => {
	try {
		const response = await Api.post(url, data);
		return response;
	} catch (error) {
		throw error.response?.data.message;
	}
};

export const patch = async (url, data = {}) => {
	try {
		const response = await Api.patch(url, data);
		return response;
	} catch (error) {
		throw error.response?.data.message;
	}
};

export const put = async (url, data = {}) => {
	try {
		const response = await Api.put(url, data);
		return response;
	} catch (error) {
		throw error.response?.data.message;
	}
};

export const remove = async (url, data = {}) => {
	try {
		const response = await Api.del(url, data);
		return response;
	} catch (error) {
		throw error.response?.data.message;
	}
};
