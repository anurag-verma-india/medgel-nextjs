import React from "react";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Investor Relation</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Annual Return</h2>
          </div>

          <div className={styles.itemList}>
            <div className={styles.item}>
              <span className={styles.itemText}>Annual Return 2020-21</span>
              <span className={styles.chevron}>›</span>
            </div>
            
            <div className={styles.item}>
              <span className={styles.itemText}>Annual Return 2023-24</span>
              <span className={styles.chevron}>›</span>
            </div>
          </div>
          
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Policies</h2>
          </div>
          <div className={styles.itemList}>
            <div className={styles.item}>
              <span className={styles.itemText}>
                Corporate Social Responsibility Policy
              </span>
              <span className={styles.chevron}>›</span>
            </div>
            <div className={styles.item}>
              <span className={styles.itemText}>Whistle Blower Policy</span>
              <span className={styles.chevron}>›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
