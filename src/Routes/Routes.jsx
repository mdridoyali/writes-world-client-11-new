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
import BlogDetails from "../pages/BlogDetails";
import DetailsWishlist from './../pages/DetailsWishlist';


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
        {
            path: '/blogDetails/:id',
            element: <BlogDetails></BlogDetails>,
            loader : ({params}) => fetch(`${params.id}`)
        },
        {
            path: '/detailsWishlist/:id',
            element: <DetailsWishlist></DetailsWishlist>,
            loader : ({params}) => fetch(`${params.id}`)
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
  