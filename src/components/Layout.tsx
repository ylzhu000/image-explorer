import React from "react";
import { Outlet } from "react-router-dom";
import { Layout as AntLayout, Typography, Flex } from "antd";
import Logo from "./Logo";

import "../styles/layout.scss";
import Title from "./Title";

export default function Layout() {
	return (
		<AntLayout className="layout">
			<AntLayout.Header className="layout__header">
				<Flex align="center" justify="space-between">
					<Title />
					<Logo />
				</Flex>
			</AntLayout.Header>
			<AntLayout.Content className="layout__content">
				<Outlet />
			</AntLayout.Content>
		</AntLayout>
	);
}
