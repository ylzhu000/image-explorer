import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getImages } from "../../services/apiImage";

export function useImage() {
	const [searchParams] = useSearchParams();
	const [prevSearchParam, setPrevSearchParam] = useState(null);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [errors, setErrors] = useState(null);
	const [initialLoad, setInitialLoad] = useState(true);

	async function fetchImages() {
		const q = searchParams.get("q");
		const page = searchParams.get("page");

		try {
			if (q && page) {
				setInitialLoad(false);
				setLoading(true);
				const data = await getImages({ q, page });
				setHasMore(!!data.data.length);

				// If prev search keyword is not the same as current, refresh entire data. Otherwise, add new data into existing array
				prevSearchParam === q
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
		initialLoad,
		loading,
		images,
		hasMore,
		errors,
	};
}
