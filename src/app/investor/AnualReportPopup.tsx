"use client";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "antd";

type AnnualReportFormType = {
  title: string;
  // anual_Report: string;
  anual_Report: File;
};

const AnualReportPopup = ({
  openEditModal,
  setOpenEditModal,
}: {
  openEditModal: boolean;
  setOpenEditModal: (openEditModal: boolean) => void;
}) => {
  const [showspin, setShowSpin] = useState(false);
  const [form, setForm] = useState<AnnualReportFormType>({
    title: "",
    anual_Report: new File([], ""),
  });

  const submit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const blankAnnualReportForm = {
    title: "",
    anual_Report: new File([], ""),
  };

  const handleOk = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setShowSpin(true);

    const formData = new FormData();
    // for (let pair of formData.entries()) {
    //         console.log(pair[0], pair[1]); // Now price will be logged as a proper JSON string
    //     }

    if (form.title && form.title.length > 0) {
      formData.append("title", form.title);
    } else {
      alert("Please enter a valid title");
      setShowSpin(false);
      return;
    }

    // Ensure it's a File before appending
    if (form.anual_Report instanceof File && form.anual_Report.size > 0) {
      formData.append("anual_Report", form.anual_Report); // 👈 send actual file
    } else {
      alert("Please upload a valid pdf file");
      setShowSpin(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/anualreport`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Anual Report created:", res.data);
      if (res.data.message === "Anual Report created successfully") {
        setShowSpin(false);
        alert("Anual Report created successfully");
        window.location.reload();
      }
      setOpenEditModal(false);
      setForm(blankAnnualReportForm);
    } catch (err) {
      console.error("Error uploading anual Report:", err);
      setShowSpin(false);
    }
  };
  const handleCancel = () => {
    setOpenEditModal(false);
    // setForm({});
    setForm(blankAnnualReportForm);
  };

  return (
    <Modal
      title={<span className="text-[#3F5D97]">Add Anual Report PDF</span>}
      open={openEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={350}
      height={300}
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
            Title:
          </label>

          <input
            type="text"
            id="AddNewOffer"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Anual Report Title"
            name="title"
            value={form.title}
            onChange={submit}
          />
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="product-images"
              className="mb-2 block text-nowrap font-bold capitalize"
            >
              File Image
            </label>

            <input
              className="form-control"
              type="file"
              accept="application/pdf"
              name="anual_Report"
              id="product-images"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setForm({ ...form, anual_Report: e.target.files[0] });
                } else {
                  // User canceled the file dialog, so reset the file in the state
                  setForm({ ...form, anual_Report: new File([], "") });
                }
              }}
              // onChange={submit}
              required
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AnualReportPopup;
