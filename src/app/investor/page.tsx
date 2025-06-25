import React from "react";
import styles from "./page.module.css";
import AnualReturn from "./AnualReturn";
import Policies from "./Policies";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";

export default async function Page() {
  const isAdmin = await checkAdminFromCookie();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Investor Relation</h1>
      </div>

      <div className={styles.content}>
        <AnualReturn isAdmin={isAdmin} />
        <Policies isAdmin={isAdmin} />
      </div>
    </div>
  );
}
