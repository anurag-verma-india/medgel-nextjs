import React from "react";
import styles from "./page.module.css";
import AnualReturn from "./AnualReturn";
import Policies from "./Policies";



export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Investor Relation</h1>
      </div>

      <div className={styles.content}>
        <AnualReturn />
        <Policies />
      </div>
    </div>
  );
}
