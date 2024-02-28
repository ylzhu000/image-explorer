import { Input, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [value, setValue] = useState("");

	// Set default pages if page param is not defined
	const setPageParam = () => {
		// const defaultPage = searchParams.get("page");
		// const updatedPage = page ? page : defaultPage ? defaultPage : 1;
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
	}, []);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSearch = (value) => {
		if (value !== "") {
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
				<Input.Search
					type="text"
					aria-label="Search box"
					size="large"
					value={value}
					onChange={handleChange}
					onSearch={handleSearch}
				/>
			</Col>
		</Row>
	);
}
