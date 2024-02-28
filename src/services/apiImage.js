export const getImages = async ({ q, page }) => {
	const apiUrl = `${
		import.meta.env.VITE_IMGUR_URL
	}/3/gallery/search/time/all/1?q=${q}&q_type=jpg&album=false&page=${page}`;

	try {
		const res = await fetch(apiUrl, {
			headers: {
				Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID}`,
			},
		});
		const data = await res.json();

		if (data.status !== 200 || !data.success) {
			throw Error(data.error);
		}
		return data;
	} catch (err) {
		throw new Error(err);
	}
};
