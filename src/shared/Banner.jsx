import { Link } from "react-router-dom";

const Banner = () => {
  return (

      <div className="relative">
        <img
          className="md:h-[550px]  w-full"
          src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsb2clMjBzaXRlJTIwYmFubmVyfGVufDB8fDB8fHww"
        />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]"></div>
        <div className="absolute top-[10%] px-6 text-2xl md:text-5xl lg:text-7xl font-bold text-slate-100">
          <h1 className="text-transparent text-4xl md:text-8xl bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
            Writes World
          </h1>
          <br />
          <p>Explore our all blogs</p> <br />
          <Link to={"/allBlogs"}>
            <button className="md:text-2xl  rounded-full font-bold btn border-none transition-all  ease-linear hover:pr-10 text-white bg-gradient-to-r from-violet-600 to-amber-500">
              Explore More
            </button>
          </Link>
        </div>
      </div>
 
  );
};

export default Banner;
