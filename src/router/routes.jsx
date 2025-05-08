import AboutUs from "../pages/about.page";
import Dashboard from "../pages/dashboard.page";
import TreeBoard from "../pages/tree.page";
import Login from "../pages/login.page";
import Signup from "../pages/signup.page";
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
        route:'/login',
        element:<Login/>
    },
    {
        route:'/signup',
        element:<Signup/>
    },
]


export const privateRoutes = [
    {
        route:'/tree',
        element:<TreeBoard/>
    },
]