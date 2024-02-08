"use client"


import React, { useState, useEffect } from "react";
import styles from "./program.module.css";
import { Button } from "@/components/ui/button";
import Search from "@/app/ui/search/Search";


import Link from "next/link";

// Main component
const Page = () => {
  // State for boys and girls data
  const [boysData, setBoysData] = useState([]);
  const [girlsData, setGirlsData] = useState([]);
  
  // State to determine which table to display
  const [showBoysTable, setShowBoysTable] = useState(true);

  // Fetch boys and girls data on component mount
  useEffect(() => {
    // Fetch boys data
    fetch("/api/participants")
      .then((res) => res.json())
      .then((data) => setBoysData(data));

    // Fetch girls data
    fetch("/api/participantsgirls")
      .then((res) => res.json())
      .then((data) => setGirlsData(data));
  }, []);

  // Toggle between boys and girls table based on button click
  const handleButtonClick = (category) => {
    setShowBoysTable(category === "Campus Boys");
  };


  // Determine which data to display based on the selected table
  const tableData = showBoysTable ? boysData : girlsData;

  // Render component
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search Participants"} />
        <div className={styles.category}>
          <Button className={styles.button} onClick={() => handleButtonClick("Campus Boys")}>
            Campus Boys
          </Button>
          <Button className={styles.button} onClick={() => handleButtonClick("Campus Girls")}>
            Campus Girls
          </Button>
          
        </div>
        <Button>
          <Link href={"/dashboard/participants/add"}>Add New</Link>
        </Button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Enrollment No</th>
            <th>Category</th>
            <th>Hall</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.fullName}</td>
              <td>{item.enrolmentNumber}</td>
              <td>{item.category}</td>
              <td>{item.hall}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the component
export default Page;
