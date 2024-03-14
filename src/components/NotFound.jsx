import { Button } from "antd";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div>
			<h2>It seems like you got lost</h2>
			<Button onClick={() => navigate("/")}>Take me home</Button>
		</div>
	);
}
