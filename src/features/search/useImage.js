import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getImages } from "../../services/apiImage";

export function useImage() {
	const [searchParams] = useSearchParams();
	const [prevSearcgParam, setPrevSearchParam] = useState(null);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [errors, setErrors] = useState(null);

	async function fetchImages() {
		const q = searchParams.get("q");
		const page = searchParams.get("page");

		try {
			if (q && page) {
				setLoading(true);
				const data = await getImages({ q, page });
				setHasMore(!!data.data.length);

				// If prev search keyword is not the same, refresh entire data. Otherwise, append new data into existing array
				prevSearcgParam === q
					? setImages([...images, ...data.data])
					: setImages(data.data);
				setLoading(false);
				setPrevSearchParam(q);
			}
		} catch (err) {
			setErrors(err);
		}
	}

	useEffect(() => {
		fetchImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	return {
		loading,
		images,
		hasMore,
		errors,
	};
}
