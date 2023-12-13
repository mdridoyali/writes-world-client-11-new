import { useQuery } from "@tanstack/react-query";
import { FaRegHeart } from "react-icons/fa";
import Banner from "../shared/Banner";
import UseLoading from "./../hooks/UseLoading";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
// import NewsLetter from "../Components/NewsLetter";
import Footer from "../shared/Footer";
import About from "./About";
import OurCategory from "../Components/OurCategory";
import { motion } from "framer-motion";
import ContactUs from "../Components/ContactUs";

const Home = () => {
  const { user } = useAuth();
  const wishlist_email = user?.email || "";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogsInHome"],
    queryFn: () =>
      fetch("https://assignment-11-jwt-server.vercel.app/blogsForHome").then(
        (res) => res.json()
      ),
  });
  console.log(data, isLoading, isError);

  const handleAddToWishlist = (item) => {
    if (!user?.email) {
      return toast.error("Login First", { duration: 3000 });
    }
    const { title, image, short_desc, long_desc, category, postedTime, email } =
      item;
    const wishListData = {
      title,
      image,
      short_desc,
      long_desc,
      category,
      postedTime,
      email,
      wishlist_email,
    };
    console.log(wishListData);
    axios
      .post(
        "https://assignment-11-jwt-server.vercel.app/wishlistBlogs",
        wishListData
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Added to the Wishlist", { duration: 3000 });
      });
  };
  if (isLoading) {
    return <UseLoading />;
  }

  return (
    <div>
      <div>
        <Banner />
        <h1 className="text-transparent text-5xl font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
          Recent Posts
        </h1>
        <div className="w-11/12 grid gap-10 grid-cols-1 mb-16 lg:grid-cols-2 mx-auto  ">
          {data?.map((item, idx) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              // whileTap={{ scale: 1.4 }}
              className="border flex  flex-col lg:flex-row hover:shadow-2xl gap-2 p-2 rounded-2xl w-full text-left shadow-lg"
              key={idx}
            >
              <div className="flex-1">
                {" "}
                <img
                  className="w-full h-72 md:h-96 lg:h-64   rounded-xl"
                  src={item.image}
                />
              </div>
              <div className="space-y-2  flex justify-between flex-col  flex-1">
                <p className="font-semibold text-xl">{item.title}</p>
                <p className="pb-2">{item.short_desc}</p>
                <div className="flex gap-2">
                  <p className="border w-max px-5 py-[2px] rounded-full border-orange-400">
                    {item.category}
                  </p>
                  <Link to={`/blogDetails/${item._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 1.4 }}
                      className="btn btn-sm btn-accent  rounded-full text-white"
                    >
                      Details
                    </motion.button>
                  </Link>
                </div>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.4 }}
                    onClick={() => handleAddToWishlist(item)}
                    className="btn btn-sm  border-orange-400  rounded-full"
                  >
                    Add To WishList{" "}
                    <FaRegHeart className="text-red-500 text-lg "></FaRegHeart>
                  </motion.button>
                </div>
                <p className="text-sm">Posted date: {item.postedTime}</p>
              </div>
            </motion.button>
          ))}
        </div>
        <OurCategory />
        <About />
        <ContactUs/>
        {/* <NewsLetter /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
