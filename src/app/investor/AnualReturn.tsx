"use client";
import React from "react";
import styles from "./page.module.css";
import AnualReportPopup from "./AnualReportPopup";
import { ReactNode, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function AnualReturn() {
  type ReportType = {
    _id: string;
    title: string;
    anual_Report: string;
  };

  const rpype: ReportType[] = [
    { _id: "8781215ftr8966", title: "Award 1", anual_Report: "uploads/1.pdf" },
    // ...
  ];
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [report, setreport] = useState<ReportType[]>([]);
  async function fetchData() {
    try {
      const reportResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/annualReport`,
      );
      console.log(reportResponse);
      if (reportResponse.data.length >= 1) {
        setreport(reportResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetch("/api/check-admin")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch((err) => console.log("Auth check error:", err));

    fetchData();
  }, []);
  const openpdf = (url: string) => {
    // console.log(`${process.env.NEXT_PUBLIC_SITE_URL}/${url}`)
    window.open(`${process.env.NEXT_PUBLIC_SITE_URL}/${url}`, "_blank");
  };

  const deletereport = async (id: string, path: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Report?",
      );
      if (!confirmDelete) return;

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/annualReport`,
        {
          data: {
            reportid: id,
            reportpath: path,
          }, // Pass image path to backend for deletion
        },
      );

      if (response.status === 200) {
        alert("Report deleted successfully.");
        window.location.reload();
        // Optionally refetch or update state
      } else {
        alert("Failed to delete Report.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        {isAdmin && (
          <div className="flex justify-end">
            <button
              className="rounded-lg bg-[#1D8892] p-3 text-white"
              onClick={() => setOpenEditModal(true)}
            >
              Add
            </button>
          </div>
        )}
        <h2 className={styles.sectionTitle}>Annual Return</h2>
      </div>

      <div className={styles.itemList}>
        {Array.isArray(report) &&
          report.length >= 1 &&
          report.map((item, index) => {
            return isAdmin ? (
              <div key={index} className={styles.item}>
                <MdDelete
                  onClick={() => deletereport(item._id, item.anual_Report)}
                  className="mb-2 h-10 w-10 cursor-pointer text-red-600"
                />
                <span
                  onClick={() => openpdf(item.anual_Report)}
                  className={styles.itemText}
                >
                  {item.title}
                </span>
                <span
                  onClick={() => openpdf(item.anual_Report)}
                  className={styles.chevron}
                >
                  ›
                </span>
              </div>
            ) : (
              <div key={index} className={styles.item}>
                <span
                  onClick={() => openpdf(item.anual_Report)}
                  className={styles.itemText}
                >
                  {item.title}
                </span>
                <span
                  onClick={() => openpdf(item.anual_Report)}
                  className={styles.chevron}
                >
                  ›
                </span>
              </div>
            );
          })}
      </div>
      {openEditModal && (
        <AnualReportPopup
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}
    </div>
  );
}
