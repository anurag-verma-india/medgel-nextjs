"use client"
import React from "react";
import styles from "./page.module.css";
import AnualReportPopup from "./AnualReportPopup.jsx"
import { ReactNode, useState,useEffect} from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
export default function AnualReturn(){
  type ReportType = {
    _id:string;
  title: string;
anual_Report: string;
};

const rpype: ReportType[] = [
  { _id:"8781215ftr8966",title: "Award 1", anual_Report: "uploads/1.pdf" },
  // ...
];
    const [openEditModal, setOpenEditModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [report, setreport] = useState<ReportType[]>([]);
  useEffect(() => {
    fetch("/api/check-admin")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch((err) => console.log("Auth check error:", err));
    async function fetchData(){
      try{
        const reportResponse= await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/annualReport`,
        );
        console.log(reportResponse)
        if(reportResponse.data.length>=1){
          setreport(reportResponse.data)
        }
      }catch(error){
      console.log(error)
    }
    }
    fetchData()
  }, []);
  const openpdf = (url: string) => {
    // console.log(`${process.env.NEXT_PUBLIC_SITE_URL}/${url}`)
    window.open(`${process.env.NEXT_PUBLIC_SITE_URL}/${url}`, '_blank');
  }
  const deletereport=(id:string,path:string)=>{
    alert(id)
  }
    return (
        <div className={styles.section}>
          
          <div className={styles.sectionHeader}>
            {isAdmin && (
        <div className="flex justify-end  ">
          <button
            className="bg-[#1D8892] rounded-lg p-3  text-white"
            onClick={() => setOpenEditModal(true)}
          >
            Edit
          </button>
        </div>
      )}
            <h2 className={styles.sectionTitle}>Annual Return</h2>
          </div>

          <div className={styles.itemList}>
           {
  Array.isArray(report) && report.map((item, index) => {
    return isAdmin ? (
      <div key={index} className={styles.item}>
                <MdDelete onClick={()=>deletereport(item._id,item.anual_Report)} className="w-10 h-10 mb-2 text-red-600 cursor-pointer"/>
        <span onClick={() => openpdf(item.anual_Report)} className={styles.itemText}>
          {item.title} (Admin)
        </span>
        <span onClick={() => openpdf(item.anual_Report)} className={styles.chevron}>›</span>
      </div>
    ) : (
      <div key={index} className={styles.item}>
        <span onClick={() => openpdf(item.anual_Report)} className={styles.itemText}>
          {item.title}
        </span>
        <span onClick={() => openpdf(item.anual_Report)} className={styles.chevron}>›</span>
      </div>
    );
  })
}

            
          </div>
          {openEditModal && (
        <AnualReportPopup
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}
        </div>
    )
}