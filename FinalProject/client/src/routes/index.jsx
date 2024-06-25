import NotFound from "../components/404Page";
import OurTeam from "../components/OurTeam";
import AboutUs from "../components/aboutUs";
import BlogDetail from "../components/blogDetail";
import BlogsSection from "../components/blogs";
import BookNow from "../components/bookNow";
import Card from "../components/card";
import Checkout from "../components/chectout";
import OurMenues from "../components/ourMenues";
import ShopDetail from "../components/shopDetail";
import ShopList from "../components/shopList";
import MainRoot from "../pages";
import Basket from "../pages/basket";
import Blog from "../pages/blog";
import Contact from "../pages/contact";
import Home from "../pages/home";
import Login from "../pages/login";
import Pagees from "../pages/page";
import Register from "../pages/register";
import Shop from "../pages/shop";


export const ROUTES = [{
    path: '/',
    element: <MainRoot />,
    children: [
        {
            index: true,
            element: <Home />,

        },
        {
            path: 'shop',
            element: <Shop />,
        },
        {
            path: 'pagees',
            element: <Pagees />,
        },
        {
            path: 'contact',
            element: <Contact />,
        },
        {
            path: 'blog/:id',
            element: <BlogDetail />,
        },
        {
            path: 'blog',
            element: <Blog />,
        },
        {
            path: 'basket',
            element: <Basket/>,
        },
        {
            path: 'shoplist',
            element: <ShopList/>,
        },
        {
            path: 'shopdetail/:id',
            element: <ShopDetail/>,
        },
        {
            path: 'card',
            element: <Card/>,
        },
        {
            path: 'checkout',
            element: <Checkout/>,
        },
        {
            path: 'aboutus',
            element: <AboutUs/>,
        },
        {
            path: 'ourmenues',
            element: <OurMenues/>,
        },
        {
            path: 'ourteam',
            element: <OurTeam/>,
        },
        {
            path: 'booknow',
            element: <BookNow/>,
        },
        {
            path: 'blokssection',
            element: <BlogsSection/>,
        },
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: 'register',
            element: <Register />,
        },
        {
            path: '*',
            element: <NotFound />,
        }
    ]

}]