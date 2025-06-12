// // import Image from 'next/image';
// import React from "react";
// const ManagementCircle = () => {
//   return (
//     <div className="mb-10 mt-10 flex h-full w-full flex-col items-center justify-center">
//       <div className="flex h-1/2 w-5/12 flex-row items-center justify-between rounded-full bg-slate-200 p-2">
//         <div className="text-center">
//           <img src="/aboutUsImg/img1.png" className="h-32 w-32" />
//           <h1>Mr. R C Mittal</h1>
//           <h1>ChairMan</h1>
//         </div>

//         <div className="space-y-52">
//           <div className="text-center">
//             <img src="/aboutUsImg/img2.png" className="h-32 w-32" />
//             <h1>Mr. R C Mittal</h1>
//             <h1>ChairMan</h1>
//           </div>
//           <div className="text-center">
//             <img src="/aboutUsImg/img3.png" className="h-32 w-32" />
//             <h1>Mr. R C Mittal</h1>
//             <h1>ChairMan</h1>
//           </div>
//         </div>
//         <div className="text-center">
//           <img src="/aboutUsImg/img1.png" className="h-32 w-32" />
//           <h1>Mr. R C Mittal</h1>
//           <h1>ChairMan</h1>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ManagementCircle;


import React from "react";
import "./ManagementCircle.css";

const topManagement = [
  {
    name: "Mr. R C Mittal",
    title: "Chairman",
    img: "/aboutUsImg/img2.png",
  },
  {
    name: "Mr. Alok K.Garg",
    title: "Vice-Chairman",
    img: "/aboutUsImg/img3.png",
  },
];

const lowerManagement = [
  {
    name: "Dr. Shashi Kant Sharma Verma",
    title: "Director",
    img: "/aboutUsImg/img3.png",
  },
  {
    name: "Mr. Praveen Nalwaya",
    title: "Director",
    img: "/aboutUsImg/img1.png",
  },
];

const ManagementCircle = () => {
  return (
    <div className="management-container">
      <h1 className="title">Management Circle</h1>
      <div className="management-row">
        {topManagement.map((person, index) => (
          <div key={index} className="management-card raised-card">
            <img src={person.img} alt={person.name} />
            <h2>{person.name}</h2>
            <p>{person.title}</p>
          </div>
        ))}
      </div>
      <div className="lower-management">
        {lowerManagement.map((person, index) => (
          <div key={index} className="management-card">
            <img src={person.img} alt={person.name} />
            <h2>{person.name}</h2>
            <p>{person.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementCircle;
