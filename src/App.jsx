import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SearchRoute from "./routes/SearchRoute";
import Layout from "./components/Layout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Navigate replace to="search" />} />
					<Route path="search" element={<SearchRoute />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
