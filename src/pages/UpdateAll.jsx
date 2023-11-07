import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UseLoading from "../hooks/UseLoading";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const UpdateAll = () => {
    const { user } = useAuth();
    const email = user?.email || "";
  const { id } = useParams();
  const postedTime = new Date();

  const { data: categories, isLoading: loading } = useQuery({
    queryKey: ["UpdateCategory"],
    queryFn: () =>
      fetch("http://localhost:5000/category").then((res) => res.json()),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["updateBlog", id],
    queryFn: () =>
      fetch(`http://localhost:5000/detailsBlogs/${id}`).then((res) => res.json()),
  });

  if (isLoading) {
    return <UseLoading />;
  }
  if (loading) {
    return <UseLoading />;
  }
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
      postedTime,
      email
    };
    console.log(blogDetails);

    axios
      .post("http://localhost:5000/allBlogs", blogDetails)
      .then((response) => {
        console.log(response.data);
        return toast.success("Updated Blog");
      });
    e.target.reset();
  };

  return (
    <div className="min-h-[60vh]">
      <div className="w-10/12 mx-auto my-10 md:my-16">
        <h2 className="text-transparent text-3xl font-semibold md:text-7xl text-center  mb-10 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
          Update Your Blog Here
        </h2>
        <form onSubmit={handleAddBlog} className="space-y-8">
          <div className="flex gap-7 flex-col md:flex-row ">
            <div className="form-control flex-1">
              <input
                type="text"
                name="title"
                defaultValue={data.title}
                placeholder="Title"
                className="input input-bordered rounded-full"
                required
              />
            </div>
            <div className="form-control flex-1">
              <input
                type="url"
                name="image"
                defaultValue={data.image}
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
                defaultValue={data.short_desc}
                placeholder="Short Description"
                className="input input-bordered rounded-full"
                required
              />
            </div>
            <div className="form-control flex-1">
                <select
              name="category"
              defaultValue={data.category}
              className="input input-bordered rounded-full"
            >
              {categories.map((item) => (
                <option key={item._id} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
            </div>
          </div>
          <div className="form-control">
            <textarea
              placeholder="Long Description"
              rows={12}
              defaultValue={data.long_desc}
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
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAll;
