import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getImages } from "../../services/apiImage";

export function useImage() {
	const [searchParams] = useSearchParams();
	const [combined, setCombined] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const q = searchParams.get("q");
	const page = searchParams.get("page");
	const imageExtRegex = /\.(jpg|png|gif)$/i;

	// React Query code
	const { data, error, isLoading } = useQuery({
		queryFn: () => getImages({ q, page }),
		queryKey: ["search", q, page],
		enabled: !!(q && page),
	});

	useEffect(() => {
		const images =
			data?.data.map((image) => ({
				link: imageExtRegex.test(image.link)
					? image.link
					: image?.images?.length && image.images[0].link, // Just grab first image of multiple for simplicity
				title: image.title,
				id: image.id,
			})) || [];
		setHasMore(!!images.length);
		setCombined([...combined, ...images]);
	}, [data]);

	return {
		isLoading,
		images: combined,
		error,
		hasMore,
	};
}
