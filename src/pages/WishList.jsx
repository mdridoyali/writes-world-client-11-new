import { useQuery } from "@tanstack/react-query";
import UseLoading from "../hooks/UseLoading";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const WishList = () => {
    const [data , setData] = useState([])
  const { user } = useAuth();
  const email = user?.email;
  console.log(email);

//   const { data, isLoading } = useQuery({
//     queryKey: ["wishlistBlogsByEmail"],
//     queryFn: () =>
//       fetch(`http://localhost:5000/wishlistBlogs?email=${email}`).then((res) =>
//         res.json()
//       ),
//   });

 useEffect(() => {
    axios.get(`http://localhost:5000/wishlistBlogs?email=${email}`)
    .then(res => {
        console.log(res.data)
        setData(res.data)
    })
 }, [email])

//   if (isLoading) {
//     return <UseLoading />;
//   }
//   console.log(data);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete("http://localhost:5000/wishlistBlogs", id);
  };

  return (
    <div className="min-h-[60vh]">
      <h1 className="text-transparent text-3xl font-semibold md:text-7xl text-center mt-8 mb-3 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
        Your WishLists
      </h1>
      <div className="text-center text-xl mb-10">
        {data.length === 0 && (
          <span>You have not added any blog to the Wish List</span>
        )}
      </div>

      <div className="w-11/12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 mx-auto  ">
        {data.map((item, idx) => (
          <div
            className="border p-5 rounded-2xl w-full space-y-4 shadow-lg"
            key={idx}
          >
            <img
              className="w-full hover:shadow-2xl  rounded-xl"
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
                <Link  to={`/blogDetails/${item._id}`}>
                  <button className="btn btn-sm btn-accent  rounded-full text-white">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
