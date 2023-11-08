import PropTypes from "prop-types";
import { FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Theme from "./Theme";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const MainLayout = ({ children }) => {
  const { user, logOutUser } = useAuth();

 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
  
  
  return (
    <div>
      
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar border-b-4 ">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-circle "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1   px-2 md:mx-2">
              <img
                className="w-8 md:w-14"
                src={"https://i.ibb.co/nM1gpGH/Screenshot-5.jpg"}
              />
              <h1 className="text-transparent text-2xl md:text-5xl font-bold bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
                Writes World
              </h1>
            </div>
            <div className="flex-none hidden lg:block">
              <div className=" flex items-center gap-5">
                {/* Navbar menu content here */}
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-accent btn-sm text-white"
                      : "btn btn-ghost btn-sm btn-active"
                  }
                >
                  <FaHome />
                  Home
                </NavLink>
                <NavLink
                  to={"/addBlog"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-accent btn-sm text-white"
                      : "btn btn-ghost btn-sm btn-active"
                  }
                >
                  Add Blog
                </NavLink>
                <NavLink
                  to={"/allBlogs"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-accent btn-sm text-white"
                      : "btn btn-ghost btn-sm btn-active"
                  }
                >
                  All Blogs
                </NavLink>
                <NavLink
                  to={"/featuredBlogs"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-accent btn-sm text-white"
                      : "btn btn-ghost btn-sm btn-active"
                  }
                >
                  Featured Blogs
                </NavLink>
                <NavLink
                  to={"/wishlist"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-accent btn-sm text-white"
                      : "btn btn-ghost btn-sm btn-active"
                  }
                >
                  Wishlist
                </NavLink>
                {/* <NavLink
                  to={"/about"}
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-accent btn-sm text-white"
                      : "btn btn-ghost btn-sm btn-active"
                  }
                >
                  About
                </NavLink> */}
              </div>
            </div>
            <div className="md:px-3">
              <Theme />
            </div>
            <div className=" ">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-20 rounded-full">
                    {user?.photoURL ? (
                      <img src={user?.photoURL} />
                    ) : (
                      <img
                        className=""
                        src={
                          "https://i.ibb.co/hDN4yRb/296-2969961-no-image-user-profile-icon.jpg"
                        }
                      />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-200 py-5 space-y-4   rounded-box w-52"
                >
                  {user && (
                    <li className="btn-ghost rounded-full hover:outline-none border-none btn-active hover:btn-accent ">
                      <a className=" text-lg font-semibold hover:text-white ">
                        {user?.displayName && user?.displayName}
                      </a>
                    </li>
                  )}
                  <li>
                    {!user && (
                      <Link
                        className="text-lg rounded-full  btn-active  hover:outline-none btn-ghost hover:btn-accent hover:text-white "
                        to={"/register"}
                      >
                        Register
                      </Link>
                    )}
                  </li>
                  <li>
                    {user ? (
                      <button
                        onClick={() => logOutUser()}
                        className="text-lg rounded-full btn-ghost  hover:outline-none border-none btn-active hover:btn-accent hover:text-white "
                      >
                        <span>Logout</span>
                        <span className="text-base">
                          <FaSignOutAlt />
                        </span>
                      </button>
                    ) : (
                      <Link
                        className="text-lg rounded-full hover:outline-none btn-ghost btn-active hover:btn-accent hover:text-white "
                        to={"/login"}
                      >
                        <button className="flex items-center gap-2">
                          <span>Login</span>
                          <span className="text-base">
                            <FaSignInAlt />
                          </span>
                        </button>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Page content here */}
          {/* Content */}
          {children}
        </div>
        <div className={`drawer-side ${isSidebarOpen ? 'open' : ''}`}>
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-white space-y-5 mt-[0px] p-5 w-9/12 h-screen  md:w-7/12 ">
            {/* Sidebar menu content here */}
            <p className="m-2"></p>
            <NavLink
             onClick={closeSidebar} 
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full text-white"
              }
            >
              <FaHome />
              Home
            </NavLink>
            <NavLink
            onClick={closeSidebar} 
              to={"/addBlog"}
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent  rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full text-white"
              }
            >
              Add Blog
            </NavLink>
            <NavLink
            onClick={closeSidebar} 
              to={"/allBlogs"}
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent  rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full text-white"
              }
            >
              All Blogs
            </NavLink>
            <NavLink
            onClick={closeSidebar} 
              to={"/featuredBlogs"}
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent  rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full text-white"
              }
            >
              Featured Blogs
            </NavLink>
            <NavLink
            onClick={closeSidebar} 
              to={"/wishlist"}
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent  rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full text-white"
              }
            >
              Wishlist
            </NavLink>
            {/* <NavLink
            onClick={closeSidebar} 
              to={"/about"}
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent  rounded-full text-white"
                  : "btn btn-ghost  btn-active rounded-full text-white"
              }
            >
              About
            </NavLink> */}
          </div>
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;
