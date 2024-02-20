import React from 'react'
import { useState,useEffect } from 'react';
import DoctorCard from '../component/DoctorCard';
import { getDocters } from "../utils/api";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";

function AdminDoctors() {
    const [doctor, setDoctor] = useState();
    const [copyData, setCopyData] = useState();
  
    useEffect(() => {
      const getFunction = async () => {
        try {
          const response = await getDocters();
          setDoctor(response);
          setCopyData(response);
        } catch (error) {
          console.error("Error during login:", error);
        }
      };
      getFunction();
    }, []);
  
    const handleSearch = (e) => {
      const query = e.target.value.toLowerCase();
      const data = copyData.filter((val) =>
        val.name.toLowerCase().includes(query)
      );
      setDoctor(data);
    };
  
    return (
      <div className="w-full px-5 flex flex-col items-center">
        <div className="flex justify-center w-[90%] my-10">
          <div className="border-2  flex items-center rounded-md w-[60%]">
            <input
              onChange={handleSearch}
              className="w-full outline-none p-2"
              type="text"
            />
            <div className="text-gray-400 ">
              <SearchIcon />
            </div>
          </div>
        </div>
        <Link
          className="h-[80px] flex justify-center items-center w-[90%] border-2 mb-10 border-dotted rounded-md border-blue-400 cursor-pointer text-blue-400"
          to="/adddoctor"
        >
          Add Doctors <AddCircleOutlineIcon />
        </Link>
        <div className="w-[90%] grid grid-cols-1 gap-2">
          {doctor?.map((val) => {
            return <DoctorCard key={val._id} data={val} />;
          })}
        </div>
      </div>
    );
}

export default AdminDoctors