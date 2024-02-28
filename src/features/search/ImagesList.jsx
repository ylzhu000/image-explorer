import { useSearchParams } from "react-router-dom";
import { Image, Row, Col, Space, Button, Flex, Empty, Spin } from "antd";

import { useImage } from "./useImage";

export default function ImagesList() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { loading, images, hasMore, errors } = useImage();

	const loadMore = (e) => {
		e.preventDefault();

		const currentPage = searchParams.get("page");
		if (currentPage) {
			searchParams.set("page", Number(currentPage) + 1);
			setSearchParams(searchParams);
		}
	};

	if (errors) {
		return (
			<div className="search-container__error">
				Something went wrong, please try again
			</div>
		);
	}

	if (images.length === 0) {
		return (
			<div className="search-container__empty">
				{loading ? (
					<Spin spinning={loading} />
				) : (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				)}
			</div>
		);
	}

	return (
		<Space direction="vertical" size="large">
			<Row gutter={[16, 16]}>
				{images?.map((image) => (
					<Col key={image.id} xxl={4} lg={6} md={8} sm={12} xs={12}>
						<Image
							loading="lazy"
							height={200}
							src={
								image.link.includes(".jpg")
									? image.link
									: image?.images?.length && image.images[0].link
							}
							alt={image.title}
							fallback="https://static.vecteezy.com/system/resources/previews/009/007/136/non_2x/failed-to-load-error-page-404-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
						/>
					</Col>
				))}
			</Row>
			<Flex align="center" justify="center">
				<Button
					size="large"
					type="primary"
					onClick={loadMore}
					loading={loading}
					disabled={!hasMore}
				>
					{hasMore ? "Load more images" : "No more images"}
				</Button>
			</Flex>
		</Space>
	);
}
