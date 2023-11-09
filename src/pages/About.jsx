import { motion } from "framer-motion";

const About = () => {
  return (
    <div className=" bg-base-200 py-20 mb-20 mx-auto">
      <div className=" flex flex-col lg:flex-row gap-6">
        <motion.button  className="w-6/12 hidden lg:block" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {" "}
          <img
            // className="w-6/12 hidden lg:block"
            src={
              "https://aagan.wpenginepowered.com/wp-content/uploads/2018/04/section-bgimage1.png"
            }
          />
        </motion.button>

        <div className="flex-1 space-y-8 px-10 lg:pr-10">
          <h1 className="text-transparent text-3xl pb-3 font-semibold md:text-7xl text-center lg:text-left mt-8 mb-3 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
            About Us
          </h1>
          <p>
            Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
            consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
            viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus
            varius laoreet. Quisque rutrum.
          </p>{" "}
          <p>
            Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
            nisi. Nam eget dui. Maecenas tempus, tellus eget condimentum
            rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed
            ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id
            lorems.
          </p>
          <button className="btn">Contact Us</button>
        </div>
        <img
          className=" lg:hidden"
          src={
            "https://img.freepik.com/free-photo/beautiful-young-woman-wearing-paisley-printed-shirt-showing-call-me-gesture_141793-31076.jpg?size=626&ext=jpg&uid=R119605278&ga=GA1.1.1266295021.1688981951&semt=ais"
          }
        />
      </div>
    </div>
  );
};

export default About;
