export default function Logo({ width = 150 }) {
	return (
		<a
			href="https://www.fieldwire.com/"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img
				src="https://www.fieldwire.com/images/Fieldwire-by-Hilti-1-line-logo.svg"
				alt="Fieldwire by Hilti Logo"
				width={width}
			/>
		</a>
	);
}
