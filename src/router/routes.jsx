import AboutUs from "../pages/about.page";
import Dashboard from "../pages/dashboard.page";
import TreeBoard from "../pages/tree.page";
import Login from "../pages/login.page";
export const publicRoutes = [
    {
        route:'/',
        element:<Dashboard/>
    },
    {
        route:'/about',
        element:<AboutUs/>
    },
    {
        route:'/tree',
        element:<TreeBoard/>
    },
    {
        route:'/login',
        element:<Login/>
    },
]