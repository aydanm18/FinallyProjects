import MainRoot from "../pages";
import Basket from "../pages/basket";
import Blog from "../pages/blog";
import Contact from "../pages/contact";
import Home from "../pages/home";
import Pagees from "../pages/page";
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
            path: 'blog',
            element: <Blog />,
        },
        {
            path: 'basket',
            element: <Basket/>,
        },
    ]

}]