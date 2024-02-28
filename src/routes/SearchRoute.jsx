import { Space } from "antd";

import Search from "../features/search/Search";
import ImageList from "../features/search/ImagesList";

import "../styles/search.scss";

export default function SearchRoute() {
	return (
		<Space direction="vertical" size="large" className="search-container">
			<Search />
			<ImageList />
		</Space>
	);
}
