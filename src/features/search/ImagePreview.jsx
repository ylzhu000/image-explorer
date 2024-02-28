import { Image } from "antd";
import { useState } from "react";

export default function ImagePreview({ src, onClose }) {
	const [visible, setVisible] = useState(true);

	const handleVisibleChange = (isVisible) => {
		setVisible(isVisible);
		onClose();
	};

	return (
		<Image
			preview={{
				visible,
				onVisibleChange: handleVisibleChange,
			}}
			src={src}
		/>
	);
}
