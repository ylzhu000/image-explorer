import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools initialIsOpen={false}> */}
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#0d5bff",
					},
				}}
			>
				<App />
			</ConfigProvider>
			{/* </ReactQueryDevtools> */}
		</QueryClientProvider>
	</React.StrictMode>
);
