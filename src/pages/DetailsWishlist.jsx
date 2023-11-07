
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import UseLoading from "../hooks/UseLoading";
import useAuth from "../hooks/useAuth";
import axios from "axios";
// import { useEffect, useState } from "react";
const DetailsWishlist = () => {
    const { id } = useParams();
    const {user} = useAuth()
    const email = user?.email
   
  const { data, isLoading} = useQuery({
    queryKey: ["blogsInDetails", id],
    queryFn: () =>
      fetch(`http://localhost:5000/detailsWishlist/${id}`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) {
    return <UseLoading />;
  }


  return (
    <div>
      <h2 className="text-transparent text-3xl font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
        Blog Details{" "}
      </h2>
      <div className="w-8/12 my-14 mx-auto  ">
        <div className=" p-4 bg-slate-200 rounded-2xl w-full space-y-4 shadow-lg">
          <img
            className="w-full hover:shadow-2xl  rounded-xl"
            src={data.image}
          />
          <h2 className="border w-max px-5 py-[2px] rounded-full border-orange-400">
            {data.category}
          </h2>
          <h2 className="font-bold text-xl ">
            {data.title}
          </h2>
          <p className=" ">
            {data.short_desc}
          </p>
          <p className=" ">
            {data.long_desc}
          </p>
        { data?.email === email && <div className="flex justify-end items-center">
           <Link to={`/updateBlog/${data._id}`} >  
           <button
              className="btn btn-sm  border-orange-400 rounded-full"
            >
              Update
            </button>
           </Link>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default DetailsWishlist;