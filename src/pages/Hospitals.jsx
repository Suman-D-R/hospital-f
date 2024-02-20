import React, { useEffect, useState } from "react";
import { hospitals } from "../utils/api";
import HospitalCard from "../component/HospitalCard";
import SearchIcon from "@mui/icons-material/Search";

function Hospitals() {
  const [hospital, setHospital] = useState();

  useEffect(() => {
    const getFunction = async () => {
      try {
        const response = await hospitals();
        setHospital(response);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };
    getFunction();
  }, []);

  return (
    <div className="w-full px-5 flex flex-col items-center">
      <div className="flex justify-center w-[90%] my-10">
        <div className="border-2  flex items-center text-gray-500 rounded-md w-[60%]">
          <input className="w-full outline-none p-2" type="text" />
          <SearchIcon />
        </div>
      </div>
      <div className="w-[90%] grid grid-cols-1 gap-2">
        {hospital?.map((val) => {
          return <HospitalCard key={val._id} data={val} />;
        })}
      </div>
    </div>
  );
}

export default Hospitals;
