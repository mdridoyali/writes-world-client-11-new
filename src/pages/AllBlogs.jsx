import { useQuery } from "@tanstack/react-query";

const AllBlogs = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: () =>
      fetch("http://localhost:5000/allBlogs").then((res) => res.json()),
  });

  if(isLoading){
    return <p>lod..</p>
  }
  if(isError){
    return <p>error..</p>
  }

  console.log(data);

  return (
    <div className=" my-12">
    <h2 className="text-3xl md:text-5xl text-center font-semibold ">All The Blogs</h2>
    <div className=" w-11/12 mx-auto flex justify-between  my-6">
        <input type="text" className="rounded-full border  " />
        <input type="text" className="rounded-full border  " />
    </div>
      <div className="w-11/12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 mx-auto  ">
        {data.map((item, idx) => (
          <div className="border p-5 rounded-2xl w-full space-y-4 shadow-lg" key={idx}>
            <img className="w-full rounded-xl" src={item.image} />
            <p className="border w-max px-5 py-[2px] rounded-full border-orange-400">{item.category}</p>
            <p className="font-semibold text-xl">{item.title}</p>
            <p>{item.short_desc}</p>
             <div className="flex justify-between items-center">
                <button className="btn btn-sm  border-orange-400 rounded-full">Add To WishList</button>
               <div className=" hover:border-orange-400 border border-white p-1 mb- rounded-full"> <button className="btn btn-sm btn-accent  rounded-full hover:text-white">Details</button></div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
