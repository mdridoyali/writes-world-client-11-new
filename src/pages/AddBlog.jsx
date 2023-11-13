import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./../hooks/useAuth";
import toast from "react-hot-toast";
import UseLoading from "../hooks/UseLoading";
import Footer from "../shared/Footer";

const AddBlog = () => {
  const { user } = useAuth();
  // const email = user?.email || "";
  const {displayName, email, photoURL} = user
  const postedTime = new Date();

  console.log(displayName, email, photoURL)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categoriesCollection"],
    queryFn: () =>
      fetch("https://assignment-11-jwt-server.vercel.app/category").then((res) => res.json()),
  });
  console.log(data)

  const handleAddBlog = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const short_desc = e.target.short_desc.value;
    const category = e.target.category.value;
    const long_desc = e.target.long_desc.value;
    const blogDetails = {
      title,
      image,
      short_desc,
      category,
      long_desc,
      email,
      postedTime,
      displayName,
    };
    console.log(blogDetails);

    axios
      .post("https://assignment-11-jwt-server.vercel.app/allBlogs", blogDetails)
      .then((response) => {
        console.log(response.data);
        return toast.success("Blog Added");
      });
    e.target.reset();
  };

  if (isLoading) {
    return <UseLoading />;
  }

  return (
   <div>
     <div className="min-h-[60vh]">
      <div className="w-10/12 mx-auto my-10 md:my-16">
        <h2 className="text-transparent text-3xl font-semibold md:text-7xl text-center pb-3 mb-10 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
          Add Your Blog Here
        </h2>
        <form onSubmit={handleAddBlog} className="space-y-8">
          <div className="flex gap-7 flex-col md:flex-row ">
            <div className="form-control flex-1">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered rounded-full"
                required
              />
            </div>
            <div className="form-control flex-1">
              <input
                type="url"
                name="image"
                placeholder="Image URL"
                className="input input-bordered rounded-full"
                required
              />
            </div>
          </div>
          <div className="flex gap-7 flex-col md:flex-row ">
            <div className="form-control flex-1">
              <input
                type="text"
                name="short_desc"
                placeholder="Short Description"
                className="input input-bordered rounded-full"
                required
              />
            </div>
            <div className="form-control flex-1">
              <select
                name="category"
                className="input input-bordered  rounded-full"
              >
                {isLoading ? (
                  <option>Loading...</option>
                ) : isError ? (
                  <option>Error loading data</option>
                ) : (
                  data.map((item) => (
                    <option key={item._id} value={item.category}>
                      {item.category}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="form-control">
            <textarea
              placeholder="Long Description"
              rows={12}
              name="long_desc"
              cols={10}
              className="input h-72 md:h-48 input-bordered "
            ></textarea>
          </div>
          <div className="form-control mt-2">
            <button
              type="submit"
              className="btn btn-accent text-white rounded-full text-xl"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
   </div>
  );
};

export default AddBlog;
