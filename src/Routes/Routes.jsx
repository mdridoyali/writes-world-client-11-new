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
import UpdateBlog from "../pages/UpdateBlog";  
import UpdateAll from "../pages/UpdateAll";
import PrivetRoute from "./PrivetRoute";


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
            element: <PrivetRoute> <AddBlog></AddBlog></PrivetRoute>
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
        {
            path: '/updateBlog/:id',
            element: <PrivetRoute><UpdateBlog></UpdateBlog></PrivetRoute> ,
            loader : ({params}) => fetch(`${params.id}`)
        },
        {
            path: '/updateAll/:id',
            element: <PrivetRoute><UpdateAll></UpdateAll></PrivetRoute>  ,
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
  