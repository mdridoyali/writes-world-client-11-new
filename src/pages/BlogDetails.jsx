import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import UseLoading from "../hooks/UseLoading";

const BlogDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogsInHome"],
    queryFn: () =>
      fetch(`http://localhost:5000/allBlogs?id=${id}`).then((res) =>
        res.json()
      ),
  });
  console.log(data, isLoading, isError);
  if (isLoading) {
    return <UseLoading />;
  }

  return (
    <div>
      <h2 className="text-transparent text-3xl font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
        Blog Details
        <div className="w-8/12 my-14 mx-auto  ">
          {data.map((item, idx) => (
            <div
              className="border  rounded-2xl w-full space-y-4 shadow-lg"
              key={idx}
            >
              <img
                className="w-full p-5 hover:shadow-2xl  rounded-xl"
                src={item.image}
              />
              {/* <p className="border w-max px-5 py-[2px] rounded-full border-orange-400">
                {item.category}
              </p> */}
              {/* <p className="font-semibold text-xl">{item.title}</p> */}
              {/* <p>{item.short_desc}</p> */}
              <div className="flex justify-end items-center">
                <button
                  // onClick={() => handleDelete(item._id)}
                  className="btn btn-sm  border-orange-400 rounded-full"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </h2>
    </div>
  );
};

export default BlogDetails;
