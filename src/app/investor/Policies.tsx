"use client"
import React from "react";
import styles from "./page.module.css";
import PolicyPopup from "./PolicyPopup.jsx"
import { ReactNode, useState,useEffect} from "react";
import axios from "axios";
export default function Policies(){
    type ReportType = {
  title: string;

policy_Report: string;
};

const rpype: ReportType[] = [
  { title: "Award 1", policy_Report: "uploads/1.pdf" },
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
          `${process.env.NEXT_PUBLIC_API_URL}/policyReport`,
        );
        console.log(reportResponse.data)
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
            <h2 className={styles.sectionTitle}>Policies</h2>
          </div>
          <div className={styles.itemList}>
            {
              Array.isArray(report) && report.map((item,index)=>{
                return(
                  <div onClick={()=>openpdf(item.policy_Report)} key={index} className={styles.item}>
              <span className={styles.itemText}>{item.title}</span>
              <span  className={styles.chevron}>›</span>
            </div>
                )
              })
            }
            
          </div>
          {(<PolicyPopup
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}
        </div>
    )
}