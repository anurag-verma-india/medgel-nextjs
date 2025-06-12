// import Image from 'next/image';
import React from "react";
const ManagementCircle = () => {
  return (
    <div className="mb-10 mt-10 flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-1/2 w-5/12 flex-row items-center justify-between rounded-full bg-slate-200 p-2">
        <div className="text-center">
          <img src="/aboutUsImg/img1.png" className="h-32 w-32" />
          <h1>Mr. R C Mittal</h1>
          <h1>ChairMan</h1>
        </div>

        <div className="space-y-52">
          <div className="text-center">
            <img src="/aboutUsImg/img2.png" className="h-32 w-32" />
            <h1>Mr. R C Mittal</h1>
            <h1>ChairMan</h1>
          </div>
          <div className="text-center">
            <img src="/aboutUsImg/img3.png" className="h-32 w-32" />
            <h1>Mr. R C Mittal</h1>
            <h1>ChairMan</h1>
          </div>
        </div>
        <div className="text-center">
          <img src="/aboutUsImg/img1.png" className="h-32 w-32" />
          <h1>Mr. R C Mittal</h1>
          <h1>ChairMan</h1>
        </div>
      </div>
    </div>
  );
};
export default ManagementCircle;
