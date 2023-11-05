import { useQuery } from "@tanstack/react-query";
import Banner from "../shared/Banner";
// import UseLoading from '../hooks/UseLoading';
import UseLoading from './../hooks/UseLoading';

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogsInHome"],
    queryFn: () =>
      fetch("http://localhost:5000/allblogs").then((res) => res.json()),
  });
  console.log(data, isLoading, isError);

  return (
    <div>
      {isLoading ? (
        <UseLoading/>
      ) : (
        <div>
          <Banner />
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
                  <button className="btn btn-sm  border-orange-400 rounded-full">
                    Add To WishList
                  </button>
                  <div className=" hover:border-orange-400 border border-white p-1 mb- rounded-full">
                    {" "}
                    <button className="btn btn-sm btn-accent  rounded-full text-white">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
 
