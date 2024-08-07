
import MainRoot from "../pages";
import AddBlog from "../pages/addBlog";
import AddProduct from "../pages/addProduct";
import AddTeam from "../pages/addTeam";
import Blog from "../pages/blogs";
import Dashboard from "../pages/dashboard";
import Detail from "../pages/detail";
import Help from "../pages/help";
import Login from "../pages/login";
import Orders from "../pages/orders";
import OurTeam from "../pages/ourTeam";
import Products from "../pages/products";
import Reservations from "../pages/reservation";
import Users from "../pages/users";




export const ROUTES = [{
    path: '/',
    element: <MainRoot />,
    children: [
        {
            index: true,
            element: <Dashboard />,

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
            path: 'users',
            element: <Users/>,
        },
        {
            path: 'login',
            element: <Login/>,
        },
        {
            path: 'orders/:id',
            element: <Detail/>,
        },
       
    ]

}]