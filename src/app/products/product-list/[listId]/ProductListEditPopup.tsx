"use client";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
// import ProductDataContext from "@/contexts/ProductDataContext";
// import { ProductContextProps, ProductsStateType } from "@/types";

type EditProductsPopupParams = {
  setModalOpen: (ModalOpen: boolean) => void;
};

const EditProductsPopup = ({ setModalOpen }: EditProductsPopupParams) => {
  const [Heading,setHeading]=useState("Cold & Flu Relief");
  const [demoDataList,SetDemoDataList]=useState([
    {
      "id":1,
      "inovator":"Day Time",
      "product":"	Acetazminophen + Dextromethophan + Phenylephrine Soft Gels",
      "code":"AP",
      "Composition":"Each soft gelatin capsule contains:Acetaminophen (325 mg) + Dextromethorphan HBr (10 mg) Phenylephrine HCl (5 mg)",
      "color":"Orange Transparent"
    }
  ])
  const demoCategoryList=[
    {"id":1,"name":"Cold & Flu Relief"},
    {"id":2,"name":"Alka Seltzer Plus Range"},
    {"id":3,"name":"Mocus Range"},
    {"id":4,"name":"Mucinex Range"},
    {"id":5,"name":"Fever Reducer"},
  ]
  const handleSave=()=>{
    const confirmSave = window.confirm(
      "Are you sure you want to save the changes? This action cannot be undone.")
        if(confirmSave){
              setModalOpen(false);
        }
  }
  const handleReset=()=>{
    const confirmSave = window.confirm(
      "Are you sure you want to Reset the changes? This action cannot be undone.")
        if(confirmSave){
              setModalOpen(false);
        }
  }
  const handleClosePopup=()=>{
    const confirmSave = window.confirm(
      "Are you sure you want to Close the Modal? All your changes will be undone.")
        if(confirmSave){
              setModalOpen(false);
        }
  }
  const handleListAdd=(e:any)=>{
    e.preventDefault();
    const newList = {
      id: demoDataList.length + 1,
      inovator: "",
      product: "",
      code: "",
      Composition: "",
      color: ""
    };
    SetDemoDataList([
      ...demoDataList,
      newList
    ]);
    console.log("New List Added", newList);
  }
  return (
    <>
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex h-5/6 flex-col items-center justify-center pt-20">
        <div
          className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mx-auto flex w-5/6 flex-col overflow-y-auto rounded-xl bg-white p-6 shadow-lg"
          style={{
            scrollbarWidth: "auto",
            scrollbarColor: "#A0AEC0 #EDF2F7",
          }}
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              type="button"
              // onClick={() => setModalOpen(false)}
              onClick={handleClosePopup}
              className="cursor-pointer border-none bg-transparent text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          {/* Category Name */}
          <h1 className="flex justify-center text-xl font-bold">
            Change Heading
          </h1>
          <div className="flex justify-center">
            <input
              className="mb-3 w-full rounded-lg border border-gray-300 p-3 text-xl font-bold shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={Heading}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setHeading(e.target.value)}
            />
          </div>

          <h1 className="flex justify-center text-xl font-bold">Lists</h1>
            <div
              className="mb-5 space-y-4 rounded-lg border p-4"
            >
              <div>
               {
                demoDataList.map((data,index)=>{
                  return (
                    <div key={data.id} className="mb-3 space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        {index + 1}.Inovator: {data.inovator}
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        defaultValue={data.inovator}
                      />
                       <label className="block text-sm font-medium text-gray-700">
                        {index + 1}. Product: {data.product}
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        defaultValue={data.product}
                      />
                      <label className="block text-sm font-medium text-gray-700">
                        {index + 1}. Code:  {data.code}
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        defaultValue={data.code}
                      />
                      <label className="block text-sm font-medium text-gray-700">
                        {index + 1}. Composition: {data.Composition}
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        defaultValue={data.Composition}
                      />
                      <label className="block text-sm font-medium text-gray-700">
                        {index + 1}. Color: {data.color}
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        defaultValue={data.color}
                      />
                    </div>
                  )
                })
               }
               
              </div>

              <div className="flex w-full">
                <div className="mr-3">
                  <div className="flex w-full justify-center text-blue-400">
                    Move List
                  </div>
                  
                  <select className="rounded-xl bg-slate-300 p-3">
                    
                    {
                      demoCategoryList.map((category)=>{
                        return (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
                <button
                  className="rounded-xl bg-slate-300 p-3 text-red-400"
                >
                  Delete List
                </button>
              </div>
            </div>
          <div className="flex justify-center text-2xl font-bold">
            Add new List
          </div>
          <div className="flex justify-center">
            <button
              className="w-1/3 rounded-lg bg-slate-300 text-3xl text-black"
              onClick={(e) => handleListAdd(e)}
            >
              +
            </button>
          </div>
          
            {/* <div className="mb-5 space-y-4 rounded-lg border p-4">
              <div>
                <label >1</label>
                <input
                  className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div> */}
         
        </div>

        {/* Action buttons */}
        <div className="fixed bottom-0 left-0 z-50 flex w-screen flex-row items-center justify-center space-x-4 space-y-0 bg-gray-800 p-4">
          <button
            type="button"
            onClick={handleClosePopup}
            className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 sm:w-auto"
          >
            Reset
          </button>
          <button
            type="submit"
            onClick={handleSave}
            className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

const ProductListEditPopup = () => {
  const [ModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {ModalOpen && <EditProductsPopup setModalOpen={setModalOpen} />}
      <div className="relative right-0 top-0">
        <button
          onClick={() => {
            setModalOpen(!ModalOpen);
            console.log("Edit Clicked");
          }}
          className="absolute right-0 top-0 rounded bg-[#00a5a5] px-4 py-2 text-black opacity-40 shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black"
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default ProductListEditPopup;
