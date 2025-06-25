"use client";
import { ApplySchemaType } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Applydata() {
  const [applyData, setApplyData] = useState<ApplySchemaType[]>([]);

  const fetchApply = async () => {
    try {
      const applyResponse = await axios.get<ApplySchemaType[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/applies`,
      );
      console.log(applyResponse.data);
      if (applyResponse.data) {
        setApplyData(applyResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApply();
  }, []);
  const openpdf = (url: string) => {
    // console.log(`${process.env.NEXT_PUBLIC_SITE_URL}/${url}`)
    window.open(`${process.env.NEXT_PUBLIC_SITE_URL}/${url}`, "_blank");
  };
  const DeleteData = async (id: string, resume: string) => {
    // var con=confirm("You Sure You Want To Delete This?")
    const con = confirm("You Sure You Want To Delete This?");
    // alert(id)
    if (con) {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/applies?id=${id}&resume=${resume}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log("Response Deleted:", res.data);
        if (res.data.success === true) {
          alert("Response Deleted successfully");
          window.location.href = "/responses";
        }
      } catch (err) {
        console.error("Error Updating News:", err);
      }
    }
  };
  return (
    <>
      {/* Table */}

      <div className="w-full overflow-x-auto">
        <table className="w-full rounded-md border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-4">Designation</th>
              <th className="border border-gray-300 p-4">Qualification</th>
              <th className="border border-gray-300 p-4">Job Description</th>
              <th className="border border-gray-300 p-4">Name</th>
              <th className="border border-gray-300 p-4">Email</th>
              <th className="border border-gray-300 p-4">Mobile</th>
              <th className="border border-gray-300 p-4">Resume</th>
              <th className="border border-gray-300 p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {applyData.map((item, index) => (
              <tr
                key={index}
                className="transition even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="border border-gray-300 p-4">
                  {item.designation}
                </td>
                <td className="border border-gray-300 p-4">
                  {item.qualification}
                </td>
                <td className="border border-gray-300 p-4">{item.jobdesc}</td>
                <td className="border border-gray-300 p-4">{item.name}</td>
                <td className="border border-gray-300 p-4">{item.email}</td>
                <td className="border border-gray-300 p-4">
                  {item.mobilenumber}
                </td>
                <td className="border border-gray-300 p-4 text-center">
                  <button
                    onClick={() => openpdf(item.resume)}
                    className="rounded-xl bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-800"
                  >
                    View Resume
                  </button>
                </td>
                <td className="border border-gray-300 p-4 text-center">
                  <button
                    onClick={() => DeleteData(item._id, item.resume)}
                    className="rounded-xl bg-red-600 px-3 py-1 text-white transition hover:bg-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
