
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UseLoading = () => {
    return (
        <SkeletonTheme baseColor="#abacb3" highlightColor="#e3e3e3">
          <p>
            <Skeleton count={20} />
          </p>
        </SkeletonTheme>
      );
};

export default UseLoading;


