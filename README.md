This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



'use client'
import React, { useState, useEffect } from "react";
import styles from "./program.module.css";
import Search from "@/app/ui/search/Search";
import axios from "axios";
import { generatePDF } from "@/app/utils/pdfUtils";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [programList, setProgramList] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get("/api/participants");
      setProgramList(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleDownloadPDF = (competitionName, participants) => {
    generatePDF(competitionName, participants);
  };

  const getCompetitions = () => {
    const competitionsMap = new Map();

    programList.forEach((participant) => {
      Object.keys(participant).forEach((key) => {
        if (key.startsWith("competition")) {
          const competitionName = participant[key];
          if (!competitionsMap.has(competitionName)) {
            competitionsMap.set(competitionName, []);
          }
          competitionsMap.get(competitionName).push({
            fullName: participant.fullName,
            codeLetter: generateRandomCodeLetter(),
          });
        }
      });
    });

    return Array.from(competitionsMap.entries());
  };

  const handleCompetitionClick = (competitionName) => {
    setSelectedCompetition((prevCompetition) =>
      prevCompetition === competitionName ? null : competitionName
    );
  };

  const generateRandomCodeLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  return (
    <div className={styles.container}>

      <span className="font-bold py-10">Boys Competitions</span>
      
      <div>
        {getCompetitions().map(([competitionName, participants], index) => (
          <div key={index}>
            <div
              onClick={() => handleCompetitionClick(competitionName)}
              className={styles.competition}
            >
              {competitionName}
            </div>
            {selectedCompetition === competitionName && (

              <div>
              <Button onClick={() => handleDownloadPDF(competitionName, participants)}>
                  Download PDF
                </Button>
              <table className={styles.participantsTable}>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Participant Name</th>
                    <th>Code Letter</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{participant.fullName}</td>
                      <td>{participant.codeLetter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              
              </div>
              
            )}


          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;


