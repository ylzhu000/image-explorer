export const getImages = async ({ q, page }) => {
	const { VITE_IMGUR_URL, VITE_IMGUR_API_VERSION, VITE_IMGUR_CLIENT_ID } =
		import.meta.env;

	// For simplicity, only fetch images with jpg and png type
	const apiUrl = `${VITE_IMGUR_URL}/${VITE_IMGUR_API_VERSION}/gallery/search/time/all/1?q=${q}&page=${page}&q_type=jpg,png`;

	try {
		const res = await fetch(apiUrl, {
			headers: {
				Authorization: `Client-ID ${VITE_IMGUR_CLIENT_ID}`,
			},
		});
		const data = await res.json();

		// Catch error when status is not 200 or success is false
		if (data.status !== 200 || !data.success) {
			throw Error(data.error);
		}

		return data;
	} catch (err) {
		throw new Error(err);
	}
};
