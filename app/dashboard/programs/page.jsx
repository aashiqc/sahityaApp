"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

export default function Home({ programs }) {
  const [uniquePrograms, setUniquePrograms] = useState([]);
  const [uniqueGirlPrograms, setUniqueGirlPrograms] = useState([]); // Initialize state for girl programs
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [participants, setParticipants] = useState([]);

  async function fetchParticipantData() {
    const response = await fetch("/api/participants");
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const fetchPrograms = async () => {
      const participantData = await fetchParticipantData();
      const allPrograms = participantData
        .map((participant) => [
          participant.competition_individual_1,
          participant.competition_individual_2,
          participant.competition_individual_3,
          participant.competition_individual_4,
          participant.competition_group_1,
          participant.competition_group_2,
        ])
        .flat();

      const uniquePrograms = Array.from(new Set(allPrograms.filter(Boolean)));

      setUniquePrograms(uniquePrograms);
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    // Call the function to fetch girl programs
    fetchGirlsPrograms();
  }, []);

  const fetchGirlsPrograms = async () => {
    const participantGirlData = await axios.get("/api/participantsgirls");
    const allGirlPrograms = participantGirlData.data
      .map((participant) => [
        participant.competition_individual_1,
        participant.competition_individual_2,
        participant.competition_individual_3,
        participant.competition_individual_4,
      ])
      .flat();

    const uniqueGirlPrograms = Array.from(
      new Set(allGirlPrograms.filter(Boolean))
    );

    setUniqueGirlPrograms(uniqueGirlPrograms);
  };

  const handleProgramClick = async (program) => {
    if (selectedProgram === program) {
      // Toggle selected program
      setSelectedProgram(null);
    } else {
      // Fetch participants for the selected program
      try {
        const responseBoys = await axios.get("/api/participants");
        const responseGirls = await axios.get("/api/participantsgirls");

        const allParticipants = [...responseBoys.data, ...responseGirls.data];

        const filteredParticipants = allParticipants.filter((participant) =>
          [
            participant.competition_individual_1,
            participant.competition_individual_2,
            participant.competition_individual_3,
            participant.competition_individual_4,
            participant.competition_group_1,
            participant.competition_group_2,
          ].includes(program)
        );

        setParticipants(filteredParticipants);
        setSelectedProgram(program);
      } catch (error) {
        console.error("Error fetching participant data:", error);
      }
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex flex-col p-4 border-r border-gray-300">
          <h1 className="font-bold mb-4">Boys Competitions</h1>
          <ul>
            {uniquePrograms.map((program, index) => (
              <li
                key={index}
                onClick={() => handleProgramClick(program)}
                className="cursor-pointer mb-2"
              >
                {program}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col p-4">
          <h1 className="font-bold mb-4">Girls Competitions</h1>
          <ul>
            {uniqueGirlPrograms.map((program, index) => (
              <li
                key={index}
                onClick={() => handleProgramClick(program)}
                className="cursor-pointer mb-2"
              >
                {program}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedProgram && (
  <div className="ml-8">
    <h2 className="font-bold mb-4">
      Participants for {selectedProgram}:
    </h2>
    <table className="table-auto pr-3">
      <thead>
        <tr>
        <th className="border px-4 py-2">S.No</th>
          <th className="border px-4 py-2">Full Name</th>
          <th className="border px-4 py-2">Enrolment Number</th>
          <th className="border px-4 py-2">Hall</th>
     
          {/* Add more table headers for other participant details as needed */}
        </tr>
      </thead>
      <tbody>
        {participants.map((participant, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{participant.fullName}</td>
            <td className="border px-4 py-2">{participant.enrolmentNumber}</td>
            <td className="border px-4 py-2">{participant.hall}</td>
   
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
}
