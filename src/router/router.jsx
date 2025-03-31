import { Route, Routes } from "react-router-dom";
import {privateRoutes, publicRoutes } from "./routes";
import Dashboard from "../pages/dashboard.page";
import IsAuth from "../shared/components/auth.component";

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
					{privateRoutes.map((route, index) => (
						<Route
							key={`private-${index}`}
							path={route.route}
							element={
								<IsAuth>
									{route.element}
								</IsAuth>
							}
						/>
					))}
			</Routes>
        </>
    )
}