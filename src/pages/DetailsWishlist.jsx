
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import UseLoading from "../hooks/UseLoading";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import Footer from "../shared/Footer";
const DetailsWishlist = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const email = user?.email;
  const name = user?.displayName;
  const userImg = user?.photoURL;

  const { data, isLoading } = useQuery({
    queryKey: ["blogsInDetails", id],
    queryFn: () =>
      fetch(`http://localhost:5000/detailsWishlist/${id}`).then((res) =>
        res.json()
      ),
  });

  const { data: commentData, isLoading: loading } = useQuery({
    queryKey: ["allComment", id],
    queryFn: () =>
      fetch(`http://localhost:5000/comments/${id}`).then((res) => res.json()),
  });
  console.log(commentData);

  if (isLoading || loading) {
    return <UseLoading />;
  }

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const commentData = { comment, email, name, userImg, id };
    // console.log(commentData)
    axios.post("http://localhost:5000/allComment", commentData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        return toast.success("Thanks for your feedback");
      }
    });
  };

  return (
  <div>
      <div className="mb-20">
      <h2 className="text-transparent text-4xl pb-3 font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
        Blog Details{" "}
      </h2>
      <div className=" w-11/12 md:w-8/12 my-10 mb-24 mx-auto  ">
        <div className=" p-4 bg-slate-200 rounded-2xl w-full space-y-4 shadow-lg">
          <img
            className="w-full hover:shadow-2xl  rounded-xl"
            src={data.image}
          />
          <h2 className="border w-max px-5 py-[2px] rounded-full border-orange-400">
            {data.category}
          </h2>
          <h2 className="font-bold text-xl ">{data.title}</h2>
          <p className=" ">{data.short_desc}</p>
          <p className=" ">{data.long_desc}</p>
          {data?.email === email && (
            <div className="flex justify-end items-center">
              <Link to={`/updateBlog/${data._id}`}>
                <button className="btn btn-sm  border-orange-400 rounded-full">
                  Update
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* text aria */}
      {user?.email === data?.email ? (
        <div className="flex items-center justify-center text-center gap-2">
          {" "}
          <p className=" text-xl border-red-600 border-b-2 max-w-fit">
            Can not comment on own blog
          </p>
          <FaTimes className="text-2xl mt-2 text-red-500 font-bold "></FaTimes>
        </div>
      ) : (
        <form onSubmit={handleComment} className="form-control space-y-5">
         <p className=" w-11/12 md:w-8/12 font-semibold mx-auto  ">Write your feedback on the comment box</p>
          <textarea
            placeholder="Write your feedback about the blog..."
            rows={5}
            name="comment"
            cols={5}
            className="input w-11/12 md:w-8/12 mx-auto h-20 input-bordered "
          ></textarea>
          <input
            type="submit"
            className="btn btn-primary w-11/12 md:w-8/12 mx-auto"
          />
        </form>
      )}

      {/* comment section */}
      <div className=" w-11/12 md:w-8/12 my-10 mt-10 mx-auto  ">
        {commentData.length < 1 ? (
          <div className="flex items-center gap-2">
            <p className="text-xl">No comments were found for this blog</p>
            <FaTimes className="text-2xl mt-2 text-red-500 font-bold "></FaTimes>
          </div>
        ) : (
          <div>
          <p className="text-3xl font-bold my-10">Users Review Here</p>
            {commentData.map((item) => (
              <div className=" flex gap-5 mb-10" key={item._id}>
               <div>
               <img
                  className="w-20 h-20 bg-gray-300 rounded-full"
                  src={item.userImg}
                />
                <p className=""></p>
               </div>
                <div className=" border-b-2 flex-1">
                  <p className="font-bold text-2xl">{item.name}</p>
                  <p className="mt-5 text-lg mb-3">{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer/>
  </div>
  );
};

export default DetailsWishlist;