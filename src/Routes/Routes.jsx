import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import ErrorPage from './../pages/ErrorPage';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import WishList from "../pages/WishList";


const routes = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/addBlog',
            element: <AddBlog></AddBlog>
        },
        {
            path: '/allBlogs',
            element: <AllBlogs></AllBlogs>
        },
        {
            path: '/featuredBlogs',
            element: <FeaturedBlogs></FeaturedBlogs>
        },
        {
            path: '/wishList',
            element: <WishList></WishList>
        },
        {
            path: '/about',
            element: <About></About>
        },
      ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
  ]);

  export default routes
  