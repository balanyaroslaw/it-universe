import { Route, Routes } from "react-router-dom";
import {publicRoutes } from "./routes";
import Dashboard from "../pages/dashboard.page";

export function Router(){
    return(
        <>
            <Routes>
					{publicRoutes.map((route, index) => (
						<Route
							key={`public-${index}`}
							path={route.route}
							element={route.element}
						/>
					))}
			</Routes>
        </>
    )
}