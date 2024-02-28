import { Input, Row, Col, Space } from "antd";
import Typography from "antd/es/typography/Typography";
import { createRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [value, setValue] = useState("");
	const inputRef = createRef();

	// Always set default page to 1 when refresh or default for data consistency
	const setPageParam = () => {
		searchParams.set("page", 1);
		setSearchParams(searchParams);
	};

	useEffect(() => {
		// Set default search value for the first time if any
		const defaultSearchValue = searchParams.get("q");
		defaultSearchValue && setValue(defaultSearchValue);

		// Set page only if search value is not empty
		if (defaultSearchValue) {
			setPageParam();
		}

		// Focus input field for initial rendering
		inputRef?.current.focus({
			cursor: "start",
		});
	}, []);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSearch = (value) => {
		if (value) {
			searchParams.set("q", value);
			setSearchParams(searchParams);
			setPageParam();
		}
	};

	return (
		<Row>
			<Col
				xxl={{ span: 12, offset: 6 }}
				lg={{ span: 16, offset: 4 }}
				md={{ span: 18, offset: 3 }}
				sm={{ span: 22, offset: 1 }}
				xs={{ span: 22, offset: 1 }}
			>
				<Space className="full-width" direction="vertical" size="large">
					{!searchParams.get("q") && (
						<Typography.Title className="text-center">
							What are you curious about today? Let&apos;s explore together.
						</Typography.Title>
					)}
					<Input.Search
						ref={inputRef}
						type="text"
						aria-label="Search box"
						size="large"
						value={value}
						onChange={handleChange}
						onSearch={handleSearch}
					/>
				</Space>
			</Col>
		</Row>
	);
}
