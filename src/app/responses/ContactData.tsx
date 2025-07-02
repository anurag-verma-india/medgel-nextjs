"use client";
import { ContactUsType } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function ContactData() {
  const [ContactData, setContactData] = useState<ContactUsType[]>([]);

  const fetchContact = async () => {
    try {
      const contactResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/contactus`,
      );
      console.log("Contact response data", contactResponse.data);
      if (contactResponse.data) {
        setContactData(contactResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContact();
  }, []);
  const DeleteData = async (id: string) => {
    // var con=confirm("Are You Sure You Want To Delete This?")
    const con = confirm("Are You Sure You Want To Delete This?");
    if (con) {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/contactus?id=${id}`,
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
              <th className="border border-gray-300 p-4">Name</th>
              <th className="border border-gray-300 p-4">Email</th>
              <th className="border border-gray-300 p-4">Subject</th>
              <th className="border border-gray-300 p-4">Message</th>
              <th className="border border-gray-300 p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ContactData.map((item, index) => (
              <tr
                key={index}
                className="transition even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="border border-gray-300 p-4">{item.name}</td>
                <td className="border border-gray-300 p-4">{item.email}</td>
                <td className="border border-gray-300 p-4">{item.subject}</td>
                <td className="border border-gray-300 p-4">{item.message}</td>
                <td className="border border-gray-300 p-4 text-center">
                  <button
                    onClick={() => DeleteData(item._id)}
                    className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-800"
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
