import React from "react";
import { Outlet } from "react-router-dom";
import { Layout as AntLayout, Typography, Flex } from "antd";
import Logo from "./Logo";

import "../styles/layout.scss";

export default function Layout() {
	return (
		<AntLayout className="layout">
			<AntLayout.Header className="layout__header">
				<Flex align="center" justify="space-between">
					<Typography.Title level={4} className="layout__header-title">
						Image Explorer
					</Typography.Title>
					<Logo />
				</Flex>
			</AntLayout.Header>
			<AntLayout.Content className="layout__content">
				<Outlet />
			</AntLayout.Content>
		</AntLayout>
	);
}
