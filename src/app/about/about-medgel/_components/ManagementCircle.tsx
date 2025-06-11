// import Image from 'next/image';
import React from "react";
const ManagementCircle = () => {
  return (
    <div className="mb-10 mt-0 flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-1/2 w-full md:w-5/12 flex-row items-center justify-between rounded-full bg-slate-100 p-2">
        <div className="text-center">
          <img src="/aboutUsImg/unknown.png" className="h-20 md:h-32 w-20 md:w-32" />
          <h1 className="text-nowrap md:text-lg text-xs">Dr. Shashi Kant Sharma</h1>
          <h1 className="text-left md:text-lg text-xs">Director</h1>
        </div>

        <div className="space-y-28 md:space-y-52">
          <div className="text-center">
            <img src="/aboutUsImg/img2.png" className="h-20 md:h-32 w-20 md:w-32" />
            <h1 className="text-nowrap md:text-lg text-xs">Mr. R C Mittal</h1>
            <h1 className="md:text-lg text-xs">ChairMan</h1>
          </div>
          <div className="text-center">
            <img src="/aboutUsImg/img3.png" className="h-20 md:h-32 w-20 md:w-32" />
            <h1 className="text-nowrap md:text-lg text-xs">Mr. Alok K. Garg</h1>
            <h1 className="md:text-lg text-xs">Director</h1>
          </div>
        </div>
        <div className="text-center">
          <img src="/aboutUsImg/img1.png" className="h-20 ml-10 md:h-32 w-20 md:w-32 " />
          <h1 className="text-nowrap md:text-lg text-xs">Mr. Praveen Nalwaya</h1>
          <h1 className="text-right md:text-lg text-xs">Director</h1>
        </div>
      </div>
    </div>
  );
};
export default ManagementCircle;
