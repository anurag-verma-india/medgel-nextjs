"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const ProductEditPopup = ({ openProductEditModal, setProductOpenEditModal, productdata,listId }) => {
  const [showspin, setShowSpin] = useState(false);
  const [ProdcutList, setProdcutList] = useState([]);
  const activeCategoryId = window.localStorage.getItem('activeCategoryId')
  // alert(listId)
  async function getcategories() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product_category?id=${activeCategoryId}`
      );

      if (res.status === 200) {
        const productLists = res.data.productCategoriesItem.productLists;
        const parr = []
        for (const product_list_id of productLists) {
          try {
            const res2 = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/product_list?product_list_id=${product_list_id}`
            );
            parr.push(res2.data.product_list)
            // console.log(res2.data.product_list);
          } catch (error) {
            console.error("Error fetching product list:", error);
          }
        }
        // console.log(parr)
        setProdcutList(parr)
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getcategories()
  }, [])
  const [form, setForm] = useState({
    product_id: productdata._id,
    innovator: productdata.innovator,
    product: productdata.product,
    code: productdata.code,
    composition: productdata.composition,
    color: productdata.color,
    product_list: ""
  });

  const submit = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOk = async (e) => {
    e.preventDefault();
    setShowSpin(true);

    const formData = new FormData();
    formData.append("product_id", form.product_id);
    formData.append("innovator", form.innovator);
    formData.append("product", form.product);
    formData.append("code", form.code);
    formData.append("composition", form.composition);
    formData.append("color", form.color);
    formData.append("product_list", form.product_list);
    // console.log(form)
    try {
  // First: Update the product
  const productUpdateRes = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/product`,
    formData, // This should be plain JSON if you're using JSON headers
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (productUpdateRes.status === 200) {
    // Second: Add product ID to product list if selected
    if (form.product_list !== "") {
      const formListData = new FormData();
      formListData.append("listId", form.product_list);  // New product ID to add
      formListData.append("_id", form.product_id);      // ID of the product list
      formListData.append("previousProductListId", listId);      // ID of the product list

      try {
        const listUpdateRes = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/product_list`,
          formListData,
          {
            // DO NOT manually set content-type for FormData
            headers: {
              'Content-Type': 'application/json'  
            },
          }
        );

        console.log(listUpdateRes)

        if (listUpdateRes.status === 200) {
          alert("Product updated and added to list successfully!");
          setShowSpin(false)
          setProductOpenEditModal(false)
          window.location.reload()
        }
      } catch (listUpdateError) {
        console.error("Error updating product list:", listUpdateError);
      }
    } else {
      alert("Product Updated Successfully!");
      setShowSpin(false)
      setProductOpenEditModal(false)
      window.location.reload()
    }
  }
} catch (error) {
  console.error("Error updating product:", error);
}



  }

  const handleCancel = () => {
    setProductOpenEditModal(false);
    setForm({});
  };

  const handleDelete = async(id) => {
    // alert(id)
    try{
      const con=confirm("Are You Sure??")
      if(con){
        setShowSpin(true)
        const res=await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product?product_id=${id}&listid=${listId}`)
      // console.log(res)
      if(res.status==200){
        
        alert("Product Deleted SuccessFully")
        setProductOpenEditModal(false);
        window.location.reload()
        setForm({});
      }
      }
      
    }catch(error){
      console.log(error)
    }
    
  };


  return (
    <Modal
      title={<span className="text-[#3F5D97]">Edit Product</span>}
      open={openProductEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={550}
      height={400}
      footer={
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleOk}
            className="w-full rounded-md border border-[#3F5D97] bg-[#3F5D97] p-2 font-semibold text-white hover:bg-[#5d7cb9] hover:text-[#3F5D97]"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-md border border-red-500 bg-red-600 p-2 font-semibold text-white hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={()=>handleDelete(form.product_id)}
            className="w-full rounded-md border border-red-500 bg-red-600 p-2 font-semibold text-white hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      }
    // className="bg-gray-100 rounded-lg" // <-- Modal background color
    >
      <div className="shadsow-md rounded-lg p-1">
        {showspin ? (
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
          </div>
        ) : (
          <></>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Innovator:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Innovator"
            name="innovator"
            value={form.innovator}
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Product"
            name="product"
            value={form.product}
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Code:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Code"
            name="code"
            value={form.code}
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="product-images"
              className="mb-2 block text-nowrap font-bold capitalize"
            >
              Add Composition
            </label>

            <textarea
              rows="5"
              type="text"
              id="AddNewOffer"
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Composition"
              name="composition"
              value={form.composition}
              onChange={submit}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Color:
            </label>

            <input
              type="text"
              id="AddNewOffer"
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Color"
              name="color"
              value={form.color}
              onChange={submit}
            />
          </div>

          <div className="mb-4">
            <labels
              htmlFor="roomType"
              className="block text-sm font-medium text-gray-700"
            >
              ProductList:
            </labels>

            <select
              id="roomType"
              placeholder="Select ProductList"
              name="product_list"
              onChange={submit}
              className="mt-2 h-10 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

            >
              <option value="0">Select Product List</option>

              {
                ProdcutList.length >= 1 ?
                
                  ProdcutList.map((item, index) => {
                    return (
                      <option value={item._id} className="text-black">{item.product_list_name}</option>

                    )
                  })
                  :
                  
                  <option value="Loading" className="text-black">Loading..</option>


              }
            </select>


          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductEditPopup;
