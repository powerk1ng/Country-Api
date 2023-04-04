

import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-md cursor-pointer shadow-md shadow-black/30 dark:border-gray-500 dark:border-2">
        <div className="h-[200px] bg-gray-500 dark:border-b-2 dark:border-b-slate-500"></div>
        <div className="p-2.5 mt-2.5">
            <div className="bg-gray-500 w-full h-4 mb-2"></div>
            <div className="bg-gray-500 w-full h-3"></div>
            <div className="bg-gray-500 w-full h-3 my-1"></div>
            <div className="bg-gray-500 w-full h-3"></div>
        </div>
    </div>
  );
};

export default Skeleton;