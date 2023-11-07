
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UseLoading from "../hooks/UseLoading";
// import { useEffect, useState } from "react";
const DetailsWishlist = () => {
    const { id } = useParams();
  // const [data, setData] = useState([])

  const { data, isLoading} = useQuery({
    queryKey: ["blogsInDetails", id],
    queryFn: () =>
      fetch(`http://localhost:5000/detailsWishlist/${id}`).then((res) =>
        res.json()
      ),
  });

  console.log(data);
  if (isLoading) {
    return <UseLoading />;
  }

  return (
    <div>
      <h2 className="text-transparent text-3xl font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
        Blog Details{" "}
      </h2>
      <div className="w-8/12 my-14 mx-auto  ">
        <div className="border  rounded-2xl w-full space-y-4 shadow-lg">
          <img
            className="w-full p-5 hover:shadow-2xl  rounded-xl"
            src={data.image}
          />
          <h3>{data.category}</h3>
          <div className="flex justify-end items-center">
            <button
              // onClick={() => handleDelete(item._id)}
              className="btn btn-sm  border-orange-400 rounded-full"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsWishlist;