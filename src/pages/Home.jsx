import { useQuery } from "@tanstack/react-query";
import Banner from "../shared/Banner";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      fetch("http://localhost:5000/allblogs").then((res) => res.json()),
  });
  console.log(data, isLoading, isError);
  if(isLoading){
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <p>
      <Skeleton count={5} />
    </p>
  </SkeletonTheme>
  }

  return (
    <div>
      <Banner />
    </div>
  );
};

export default Home;
