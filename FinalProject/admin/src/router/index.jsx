import MainRoot from "../pages";
import AddBlog from "../pages/addBlog";
import AddProduct from "../pages/addProduct";
import AddTeam from "../pages/addTeam";
import Blog from "../pages/blogs";
import Categories from "../pages/categories";
import Dashboard from "../pages/dashboard";
import Help from "../pages/help";
import Home from "../pages/home";
import Login from "../pages/login";
import Orders from "../pages/orders";
import OurTeam from "../pages/ourTeam";
import Products from "../pages/products";
import Reservations from "../pages/reservation";
import Sidebar from "../pages/sidebar";
import Users from "../pages/users";




export const ROUTES = [{
    path: '/admin',
    element: <MainRoot />,
    children: [
        {
            index: true,
            element: <Home />,

        },
        {
            path: 'addblog',
            element: <AddBlog />,
        },
        {
            path: 'addproduct',
            element: <AddProduct />,
        },
        {
            path: 'addteam',
            element: <AddTeam />,
        },
        {
            path: 'blogs',
            element: <Blog />,
        },
        {
            path: 'categories',
            element: <Categories />,
        },
        {
            path: 'dashboard',
            element: <Dashboard/>,
        },
        {
            path: 'help',
            element: <Help/>,
        },
        {
            path: 'orders',
            element: <Orders/>,
        },
        {
            path: 'ourteam',
            element: <OurTeam/>,
        },
        {
            path: 'products',
            element: <Products/>,
        },
        {
            path: 'reservations',
            element: <Reservations/>,
        },
        {
            path: 'sidebar',
            element: <Sidebar/>,
        },
        {
            path: 'users',
            element: <Users/>,
        },
        {
            path: 'login',
            element: <Login/>,
        },
       
    ]

}]