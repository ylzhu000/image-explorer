import { Typography } from "antd";
import { NavLink } from "react-router-dom";

export default function Title() {
	return (
		<NavLink to="/">
			<Typography.Title level={4} className="layout__header-title">
				Image Explorer
			</Typography.Title>
		</NavLink>
	);
}
