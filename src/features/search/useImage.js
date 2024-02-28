import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getImages } from "../../services/apiImage";

export function useImage() {
	const [searchParams] = useSearchParams();
	const [prevSearchParam, setPrevSearchParam] = useState(null);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [errors, setErrors] = useState(null);
	const [initialLoad, setInitialLoad] = useState(true);

	async function fetchImages() {
		const q = searchParams.get("q");
		const page = searchParams.get("page");
		const isSameSearch = q === prevSearchParam;
		const imageExtRegex = /\.(jpg|png|gif)$/i;

		try {
			if (q && page) {
				setInitialLoad(false);
				isSameSearch ? setLoadingMore(true) : setLoading(true);

				let data = await getImages({ q, page });
				data = data?.data.map((image) => ({
					link: imageExtRegex.test(image.link)
						? image.link
						: image?.images?.length && image.images[0].link, // Just grab first image of multiple for simplicity
					title: image.title,
					id: image.id,
				}));

				// If prev search keyword is not the same as current, refresh entire data. Otherwise, add new data into existing array
				prevSearchParam === q
					? setImages([...images, ...data])
					: setImages(data);

				setHasMore(!!data.length);
				setLoading(false);
				setLoadingMore(false);
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
		loadingMore,
		hasMore,
		images,
		errors,
	};
}
