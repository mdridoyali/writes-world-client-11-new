import { useQuery } from "@tanstack/react-query";

const AddBlog = () => {

    const { data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch('https://api.github.com/repos/TanStack/query').then(
            (res) => res.json(),
          ),
      })
      console.log(data)

  const handleAddBlog = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const short_desc = e.target.short_desc.value;
    const category = e.target.category.value;
    const long_desc = e.target.long_desc.value;
    // console.log(title, image, short_desc, category, long_desc);
    const blogDetails = {title, image, short_desc, category, long_desc}
    console.log(blogDetails)
  };

  return (
    <div className="w-10/12 mx-auto my-10 md:my-20">
      <h2 className="text-3xl md:text-5xl text-center font-semibold mb-10 ">
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
              className="input input-bordered rounded-full"
            >
              <option>Category</option>
              <option>Cat</option>
            </select>
          </div>
        </div>
        <div className="form-control">
          <textarea
            placeholder="Long Description"
            rows={12}
            name="long_desc"
            cols={10}
            className="input h-40 md:h-28 input-bordered "
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
  );
};

export default AddBlog;
