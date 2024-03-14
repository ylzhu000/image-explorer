import React from "react";
import { Outlet } from "react-router-dom";
import { Layout as AntLayout, Flex } from "antd";

import "../styles/layout.scss";
import Title from "./Title";

export default function Layout() {
	return (
		<AntLayout className="layout">
			<AntLayout.Header className="layout__header">
				<Flex align="center" style={{ height: "100%" }}>
					<Title />
				</Flex>
			</AntLayout.Header>
			<AntLayout.Content className="layout__content">
				<Outlet />
			</AntLayout.Content>
		</AntLayout>
	);
}
