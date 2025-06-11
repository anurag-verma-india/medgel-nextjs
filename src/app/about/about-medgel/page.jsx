import Image from 'next/image';
import React from 'react';
const AboutUs=()=>{
    return(
        <div className="w-full h-full flex flex-col items-center justify-center mt-10 mb-10">
        {/* IMage Compenet Start */}
        <div className="w-5/12 h-1/2 p-2 rounded-full  justify-between items-center bg-slate-200 flex flex-row">
           <div className='text-center'>
           <img src="/aboutUsImg/img1.png" className="w-32 h-32" />
           <h1>Mr. R C Mittal</h1>
           <h1>ChairMan</h1>
           </div>
           
           <div className='space-y-52'>
            <div className='text-center'>
           <img src="/aboutUsImg/img2.png" className="w-32 h-32" />
           <h1>Mr. R C Mittal</h1>
           <h1>ChairMan</h1>
           </div>
                <div className='text-center'>
           <img src="/aboutUsImg/img3.png" className="w-32 h-32" />
           <h1>Mr. R C Mittal</h1>
           <h1>ChairMan</h1>
           </div>
           </div>
           <div className='text-center'>
           <img src="/aboutUsImg/img1.png" className="w-32 h-32" />
           <h1>Mr. R C Mittal</h1>
           <h1>ChairMan</h1>
           </div>
           
            </div>
        {/* IMage Compenet End */}
        </div>
    )
}
export default AboutUs