import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Row, Col, Space, Button, Flex, Empty, Spin } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useImage } from "./useImage";
import ImagePreview from "./ImagePreview";

export default function ImagesList() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectImage, setSelectedImage] = useState("");
	const { loading, loadingMore, images, hasMore, errors, initialLoad } =
		useImage();

	const handleLoadMore = (e) => {
		e.preventDefault();

		const currentPage = searchParams.get("page");
		if (currentPage) {
			searchParams.set("page", Number(currentPage) + 1);
			setSearchParams(searchParams);
		}
	};

	if (initialLoad) return;

	if (errors) {
		return (
			<div className="search-container__error">
				Something went wrong, please try again
			</div>
		);
	}

	if (loading) {
		return (
			<div className="search-container__loading">
				<Spin spinning={loading} />
			</div>
		);
	}

	if (images.length === 0) {
		return (
			<div className="search-container__empty">
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</div>
		);
	}

	const handlePreview = (src) => {
		setSelectedImage(src);
	};

	const handleClose = () => {
		setSelectedImage("");
	};

	return (
		<Space direction="vertical" size="large">
			<Row gutter={[16, 16]}>
				{images?.map((image) => {
					const link = image.link.includes(".jpg")
						? image.link
						: image?.images?.length && image.images[0].link;
					return (
						<Col key={image.id} xxl={4} lg={6} md={8} sm={12} xs={12}>
							<LazyLoadImage
								key={image.id}
								height={200}
								width="100%"
								src={link}
								alt={image.title}
								onClick={() => handlePreview(link)}
							/>
						</Col>
					);
				})}
			</Row>

			<Flex align="center" justify="center">
				<Button
					size="large"
					type="primary"
					onClick={handleLoadMore}
					loading={loadingMore}
					disabled={!hasMore}
				>
					{hasMore ? "Load more images" : "No more images"}
				</Button>
			</Flex>
			{selectImage && <ImagePreview src={selectImage} onClose={handleClose} />}
		</Space>
	);
}
