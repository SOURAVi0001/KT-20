import React from "react";
import styles from "./PointTable.module.css";
import { FaSyncAlt, FaFilePdf, FaFileExcel, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useState,useEffect } from "react";
const PointTable = () => {
  const cricketTeam = [
    { id: 1, fullName: "Virat Kohli", score: 78, oversPlayed: 45, sixes: 2, fours: 8 },
    { id: 2, fullName: "Rohit Sharma", score: 92, oversPlayed: 38, sixes: 5, fours: 9 },
    { id: 3, fullName: "Steve Smith", score: 45, oversPlayed: 12, sixes: 1, fours: 5 },
    { id: 4, fullName: "Kane Williamson", score: 64, oversPlayed: 14, sixes: 2, fours: 6 },
    { id: 5, fullName: "Joe Root", score: 51, oversPlayed: 13, sixes: 1, fours: 5 },
    { id: 6, fullName: "David Warner", score: 87, oversPlayed: 16, sixes: 4, fours: 7 },
    { id: 7, fullName: "Ben Stokes", score: 39, oversPlayed: 10, sixes: 1, fours: 4 },
    { id: 8, fullName: "MS Dhoni", score: 58, oversPlayed: 11, sixes: 3, fours: 4 },
    { id: 9, fullName: "Jasprit Bumrah", score: 12, oversPlayed: 4, sixes: 0, fours: 1 },
    { id: 10, fullName: "Trent Boult", score: 18, oversPlayed: 6, sixes: 1, fours: 2 },
    { id: 11, fullName: "Pat Cummins", score: 25, oversPlayed: 8, sixes: 1, fours: 3 }
  ];
  
  const [players, setPlayers] = useState([[]]);
  

  useEffect(() => {
    axios.get('http://localhost:8080/match/point-table')
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
      });
  }, []);

  const headers = players[0]; // Extract column headers
  const rows = players.slice(1);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.panelHeading}>
          <h4 className={styles.title}>SCORE <span>CARD</span></h4>
         
        </div>
        <div className={styles.panelBody}>
        <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
        </div>
        <div className={styles.panelFooter}>
        </div>
      </div>
    </div>
  );
};

export default PointTable;