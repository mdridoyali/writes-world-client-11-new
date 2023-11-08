
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import UseLoading from "../hooks/UseLoading";


const OurCategory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      fetch("https://assignment-11-jwt-server.vercel.app/category").then((res) => res.json()),
  });

  if (isLoading || isError) {
    return <UseLoading />;
  }
//   whileHover={{ scale: 1.1 }}

  return (
    <div className="w-11/12 mb-16 mx-auto">
      <h2 className="text-transparent text-3xl font-semibold md:text-6xl text-center pb-3 mb-10 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
        Our Most Popular Categories
      </h2>
      <div className="grid gap-10 mt-16 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <motion.button
            key={item._id}
            whileHover={{
      scale: [1, 1, 1, 1, 1],
      rotate: [ 150,0 ],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
          >
            <img className="rounded-full" src={item.img} />
            <div>
              <h2 className="text-center text-xl font-bold rounded-full bg-lime-100">
                {item.category}
              </h2>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default OurCategory;


// import { motion } from "framer-motion"
// import useHover from './../hooks/useHover';


//  const OurCategory = () => {
    
//    return <motion.button
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.9 }}
//   >
     
//       <useHover></useHover>
//   </motion.button>
  

// }

// export default OurCategory;

// const OurCategory = () => {

    
    
//     const { data, isLoading, isError } = useQuery({
//         queryKey: ["category"],
//         queryFn: () =>
//           fetch("https://assignment-11-jwt-server.vercel.app/category").then((res) => res.json()),
//       });

//       if(isLoading || isError){
//         return <UseLoading/>
//       }
//       console.log(data)

//     return (
//         <div className="w-11/12 mb-16 mx-auto">
//           <h2 className="text-transparent text-3xl font-semibold md:text-6xl text-center pb-3 mb-10 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
//           Our Most Popular Categories
//         </h2>
//             <div className="grid gap-10 mt-16 md:grid-cols-2 lg:grid-cols-3">
//                 {
//                     data.map(item => (
//                         <div className=" mb-5 " key={item._id}>
                        
//                             <img className="rounded-full " src={item.img} />
//                             <div>
//                                 <h2 className="text-center text-xl font-bold rounded-full bg-lime-100">{item.category}</h2>
//                             </div>
//                             <MyComponent /> 
//                         </div>

//                     ))
//                 }
//             </div>


//         </div>
//     );
// };

// export default OurCategory;

// hover:translate-x-2 hover:translate-y-2 transform-gpu transition-all