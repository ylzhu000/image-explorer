import { Image } from "antd";
import { useState } from "react";

export default function ImagePreview({ src, onClose }) {
	const [visible, setVisible] = useState(true);

	const handleVisibleChange = (isVisible) => {
		setVisible(isVisible);
		// Notify parent to set src to empty in order to close the preview
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
