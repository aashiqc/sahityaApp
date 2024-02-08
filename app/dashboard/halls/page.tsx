'use client'
import prisma from "@/app/lib/prisma";
import React, { useState, useEffect } from "react";
import styles from "./halls.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Search from "@/app/ui/search/Search";
import axios from "axios";

interface Hall {
  hallname: string;
  count: number;
}

const Page = () => {
  const [hallsData, setHallsData] = useState<Hall[]>([]);

  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    try {
      const response = await axios.get("/api/halls");
      setHallsData(response.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search Program"} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Hall Name</th>
            <th>No of Participants</th>
          </tr>
        </thead>
        <tbody>
          {hallsData.map((item, index) => (
            <tr key={item.hallname}>
              <td>{index + 1}</td>
              <td>{item.hallname}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
