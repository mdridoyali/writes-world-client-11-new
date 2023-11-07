import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaSistrix } from "react-icons/fa";
import UseLoading from "../hooks/UseLoading";
import useAuth from "./../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const AllBlogs = () => {
  const { user } = useAuth();
  const wishlist_email = user?.email || "";
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loader, setLoader] = useState(true)

  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };
  // const handleSearchInput = (e) => {
  //   setSearchValue(e.target.searchValue.value);
  //   console.log(e.target.value);
  // };

  const handleSearch = (e) => {
    // e.preventDefault();
    console.log(e.target.searchValue.value)
    setLoader(true)
    setSearchValue(e.target.searchValue.value)
    fetch(
      `http://localhost:5000/allBlogs?title=${searchValue}&category=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
        setLoader(false)
      });
  };

  useEffect(() => {
    setLoader(true)
    fetch(
      `http://localhost:5000/allBlogs?title=${searchValue}&category=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
        setLoader(false)
      });
  }, [searchValue, selectedCategory]);

  const { isLoading } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: () =>
      fetch(
        `http://localhost:5000/allBlogs?title=${searchValue}&category=${selectedCategory}`
      ).then((res) => res.json()),
  });
  if (isLoading || loader) {
    return <UseLoading />;
  }
  // console.log(data);

  const handleAddToWishlist = (item) => {
    const { title, image, short_desc, long_desc, category, postedTime, email } = item;
    const wishListData = {
      title,
      image,
      short_desc,
      long_desc,
      category,
      postedTime,
      email,
      wishlist_email
    };
    console.log(wishListData);
    axios
      .post("http://localhost:5000/wishlistBlogs", wishListData)
      .then((res) => {
        console.log(res.data);
        toast.success("Added to the Wishlist", { duration: 3000 });
      });
  };

  return (
    <div>
      {isLoading ? (
        <UseLoading />
      ) : (
        <div className=" my-12">
          <h2 className="text-transparent text-3xl font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
            All The Blogs
          </h2>

          <div className=" w-11/12 mx-auto gap-5 md:gap-20 lg:gap-72 flex flex-col md:flex-row justify-between  my-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="searchValue"
                placeholder="Search by title"
                // value={searchValue}
                // onClick={handleSearchInput}
                className="rounded-full h-12 w-full outline-none border pl-5 pr-20 border-orange-400"
              />
              <button
                type="submit"
                className="absolute right-0 hover:btn-accent rounded-full h-full outline-none border px-7 border-orange-400"
              >
                <FaSistrix className="text-2xl"></FaSistrix>
              </button>
            </form>
            <select
              onChange={handleCategory}
              value={selectedCategory}
              className="input border-orange-400 rounded-full"
            >
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Nature">Nature</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>
          <div className="w-11/12 grid gap-5 grid-cols-1 mb-16 lg:grid-cols-2 mx-auto  ">
            {blogs.map((item, idx) => (
              <div
                className="border flex  flex-col lg:flex-row gap-2 p-2 rounded-2xl w-full  shadow-lg"
                key={idx}
              >
                <div className="flex-1">
                  {" "}
                  <img
                    className="w-full h-72 md:h-96 lg:h-64 hover:shadow-2xl  rounded-xl"
                    src={item.image}
                  />
                </div>
                <div className="space-y-2 flex justify-between flex-col flex-1">
                  <p className="font-semibold text-xl">{item.title}</p>
                  <p className="pb-2">{item.short_desc}</p>
                  <div className="flex gap-2">
                    <p className="border w-max px-5 py-[2px] rounded-full border-orange-400">
                      {item.category}
                    </p>
                    <Link  to={`/blogDetails/${item._id}`}>
                    <button  className="btn btn-sm btn-accent  rounded-full text-white">
                      Details
                    </button>
                    </Link>
                  </div>
                 <div className="pt-2">
                 <button
                    onClick={() => handleAddToWishlist(item)}
                    className="btn btn-sm  border-orange-400  rounded-full"
                  >
                    Add To WishList{" "}
                    <FaRegHeart className="text-red-500 text-lg "></FaRegHeart>
                  </button>
                 </div>
                  <p className="text-sm">Posted date: {item.postedTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
