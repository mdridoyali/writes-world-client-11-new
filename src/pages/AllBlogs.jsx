import { useQuery } from "@tanstack/react-query";
import { FaSistrix } from "react-icons/fa";
const AllBlogs = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: () =>
      fetch("http://localhost:5000/allBlogs").then((res) => res.json()),
  });
  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["categoryForFilter"],
    queryFn: () =>
      fetch("http://localhost:5000/category").then((res) => res.json()),
  });
  console.log(categoryData);

  if (isLoading) {
    return <p>lod..</p>;
  }
  if (isError) {
    return <p>error..</p>;
  }

  const handleCategory = (e) => {
    e.preventDefault();
    const categoryValue = e.target.value;
    console.log(categoryValue);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchValue.value;
    console.log(searchValue);
  };

  return (
    <div className=" my-12">
      <h2 className="text-3xl md:text-5xl text-center font-semibold ">
        All The Blogs
      </h2>
      <div className=" w-11/12 mx-auto gap-5 md:gap-20 lg:gap-72 flex flex-col md:flex-row justify-between  my-6">
        <form onSubmit={handleSearch} className="relative ">
          <input
            type="text"
            name="searchValue"
            placeholder="Search by title"
            className="rounded-full  h-12 w-full outline-none border pl-5 pr-20 border-orange-400 "
          />
          <button
            type="submit"
            className="absolute right-0 hover:btn-accent  rounded-full  h-full outline-none border px-7 border-orange-400 "
          >
            <FaSistrix className="text-2xl"></FaSistrix>
          </button>
        </form>
        <select
          onChange={handleCategory}
          className="input  border-orange-400 rounded-full"
        >
        <option>All</option>
          {categoryLoading ? (
            <option>Loading...</option>
          ) : categoryError ? (
            <option>Error loading data</option>
          ) : (
            categoryData.map((item) => (
              <option key={item._id} value={item.category}>
                {item.category}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="w-11/12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 mx-auto  ">
        {data.map((item, idx) => (
          <div
            className="border p-5 rounded-2xl w-full space-y-4 shadow-lg"
            key={idx}
          >
            <img className="w-full rounded-xl" src={item.image} />
            <p className="border w-max px-5 py-[2px] rounded-full border-orange-400">
              {item.category}
            </p>
            <p className="font-semibold text-xl">{item.title}</p>
            <p>{item.short_desc}</p>
            <div className="flex justify-between items-center">
              <button className="btn btn-sm  border-orange-400 rounded-full">
                Add To WishList
              </button>
              <div className=" hover:border-orange-400 border border-white p-1 mb- rounded-full">
                {" "}
                <button className="btn btn-sm btn-accent  rounded-full hover:text-white">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
