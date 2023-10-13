import React from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

import './index.css'

const CustomSkeleton = () => {
  return (
   <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Skeleton height={1500} width={1200} />
      <Skeleton height={20} width={150} />
   </SkeletonTheme>
  );
};

export default CustomSkeleton;
