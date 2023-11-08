import { useQuery } from "@tanstack/react-query";
import UseLoading from "../hooks/UseLoading";
import DataTable from "react-data-table-component";
import Footer from "../shared/Footer";

const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
            overflowX: 'auto',
            background: 'gray-200', 
            whiteSpace: 'nowrap',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontWeight: 'bold',
            fontSize: '15px',
            width: '50px', 
            whiteSpace: 'nowrap',
            overflowX: 'auto'
        },
    },
    cells: {
        style: {
            paddingLeft: '1px', // override the cell padding for data cells
            paddingRight: '1px',
            fontWeight: 'bold'
        },
    },
};


const FeaturedBlogs = () => {
    
  const { data, isLoading } = useQuery({
    queryKey: ["tenBlogs"],
    queryFn: () =>
      fetch("https://assignment-11-jwt-server.vercel.app/tenBlogs").then((res) => res.json()),
  });
  console.log(data);

  if (isLoading) {
    return <UseLoading />;
  }

  const columns = [
    {
      name: "Serial No.",
      selector: (row, index) => <p className="">{index + 1}</p>,
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
        <h1 className="text-transparent text-4xl pb-3 font-semibold md:text-7xl text-center my-8 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
          Featured Blogs
        </h1>
        <div className="  border overflow-x-scroll">
          <DataTable  className="" columns={columns} data={data}  customStyles={customStyles}></DataTable>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturedBlogs;
