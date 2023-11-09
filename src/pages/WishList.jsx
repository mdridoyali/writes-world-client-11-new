import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import UseLoading from "../hooks/UseLoading";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../shared/Footer";
import { motion } from "framer-motion";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const email = user?.email;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://assignment-11-jwt-server.vercel.app/wishlistBlogs?email=${email}`
      )
      .then((res) => {
        console.log(res.data);
        setWishlist(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [email]);

  if (loading) {
    return <UseLoading />;
  }

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this Wishlist",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            "https://assignment-11-jwt-server.vercel.app/wishlistBlogs",
            id
          )
          .then((data) => {
            console.log(data);
            if (data.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your Wishlist has been deleted.",
                "success"
              );
              const remaining = wishlist.filter((item) => item._id !== id);
              setWishlist(remaining);
            }
          });
      }
    });
  };

  return (
    <div>
      <div className="min-h-[60vh] mb-20">
        <h1 className="text-transparent text-3xl pb-3 font-semibold md:text-7xl text-center mt-8 mb-3 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
          Your WishLists
        </h1>
        <div className="text-center text-xl mb-10">
          {wishlist.length === 0 && (
            <span>You have not added any blog to the Wish List</span>
          )}
        </div>

        <div className="w-11/12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 mx-auto  ">
          {wishlist.map((item, idx) => (
            <motion.button
              animate={{ scale: [0, 1, 0.5, 1] }}
              transition={{ times: [0, 0.1, 0.9, 1] }}
              className="border p-5 rounded-2xl w-full  hover:shadow-2xl  space-y-4 shadow-lg"
              key={idx}
            >
              <img
                className="w-full h-72 rounded-xl"
                src={item.image}
              />
              <p className="border w-max px-5 py-[2px] rounded-full border-orange-400">
                {item.category}
              </p>
              <p className="font-semibold text-xl">{item.title}</p>
              <p>{item.short_desc}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-sm  border-orange-400 rounded-full"
                >
                  Delete
                </button>
                <div className=" hover:border-orange-400 border border-white p-1 mb- rounded-full">
                  {" "}
                  <Link to={`/detailsWishlist/${item._id}`}>
                    {" "}
                    <button className="btn btn-sm btn-accent  rounded-full text-white">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishList;
