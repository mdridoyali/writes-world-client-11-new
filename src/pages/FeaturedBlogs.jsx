import { useQuery } from "@tanstack/react-query";
import UseLoading from "../hooks/UseLoading";
import DataTable from "react-data-table-component";
import Footer from "../shared/Footer";

const FeaturedBlogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tenBlogs"],
    queryFn: () =>
      fetch("http://localhost:5000/tenBlogs").then((res) => res.json()),
  });
  console.log(data);

  if (isLoading) {
    return <UseLoading />;
  }

  const columns = [
    {
      name: "Serial No.",
      selector: (row, index) => <p>{index + 1}</p>,
    },
    {
      name: "Image",
      cell: (row) => <img className="rounded-full w-14 h-14 my-3 bg-base-300" src={row.photoURL} alt="Blog Image" width="50" />,
    },
    {
      name: "Name",
      selector: (row) => row.displayName,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
  ];

  return (
    <div>
      <div className=" w-12/12 p-1 mb-20 mx-auto">
        <h1 className="text-transparent text-5xl pb-3 font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
          Featured Blogs
        </h1>
        <div className="border ">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturedBlogs;
