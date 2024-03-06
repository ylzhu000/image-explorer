import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Row, Col, Space, Button, Flex, Empty, Spin } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useImage } from "./useImage";
import ImagePreview from "./ImagePreview";

export default function ImagesList() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectImage, setSelectedImage] = useState("");
	const { isLoading, images, error, hasMore } = useImage();

	const page = searchParams.get("page");

	if (!searchParams.get("q")) return;

	if (error) {
		return (
			<div className="search-container__error">
				Something went wrong, please try again
			</div>
		);
	}

	if (isLoading && page <= 1) {
		return (
			<div className="search-container__loading">
				<Spin spinning={isLoading} />
			</div>
		);
	}

	if (images?.length === 0) {
		return (
			<div className="search-container__empty">
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</div>
		);
	}

	const handleLoadMore = (e) => {
		e.preventDefault();

		if (page) {
			searchParams.set("page", Number(page) + 1);
			setSearchParams(searchParams);
		}
	};

	const handlePreview = (src) => {
		setSelectedImage(src);
	};

	const handleClose = () => {
		setSelectedImage("");
	};

	return (
		<Space direction="vertical" size="large">
			<Row gutter={[16, 16]}>
				{images?.map((image) => (
					<Col key={image.id} xxl={4} lg={6} md={8} sm={12} xs={12}>
						<LazyLoadImage
							height={200}
							width="100%"
							src={image.link}
							alt={image.title}
							onClick={() => handlePreview(image.link)}
						/>
					</Col>
				))}
			</Row>

			<Flex align="center" justify="center">
				<Button
					size="large"
					type="primary"
					onClick={handleLoadMore}
					loading={isLoading}
					disabled={!hasMore}
				>
					{hasMore ? "Load more images" : "No more images"}
				</Button>
			</Flex>
			{selectImage && <ImagePreview src={selectImage} onClose={handleClose} />}
		</Space>
	);
}
