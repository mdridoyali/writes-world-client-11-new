import { useQuery } from "@tanstack/react-query";
import { FaRegHeart } from "react-icons/fa";
import Banner from "../shared/Banner";
import UseLoading from "./../hooks/UseLoading";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import NewsLetter from "../Components/NewsLetter";

const Home = () => {
  const { user } = useAuth();
  const wishlist_email = user?.email || "";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogsInHome"],
    queryFn: () =>
      fetch("http://localhost:5000/blogsForHome").then((res) => res.json()),
  });
  console.log(data, isLoading, isError);

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
if(isLoading){
  return <UseLoading/>
}



  return (
    <div>
     
        <div>
          <Banner />
          <h1 className="text-transparent text-5xl font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
            Recent Posts
          </h1>
          <div className="w-11/12 grid gap-5 grid-cols-1 mb-16 lg:grid-cols-2 mx-auto  ">
            {data?.map((item, idx) => (
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
                <div className="space-y-2  flex justify-between flex-col  flex-1">
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
           <NewsLetter/>
        </div>
     
    </div>
  );
};

export default Home;
