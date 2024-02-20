import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDocters } from "../utils/api";

function AddDoctor() {
  const [doctorData, setDoctorData] = useState({
    name: "",
    specialization: "",
    availability: [],
  });

  const [selectedDays, setSelectedDays] = useState([]);

  const notifySuccess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const daysOfWeek = [
    { name: "Monday", value: "monday" },
    { name: "Tuesday", value: "tuesday" },
    { name: "Wednesday", value: "wednesday" },
    { name: "Thursday", value: "thursday" },
    { name: "Friday", value: "friday" },
    { name: "Saturday", value: "saturday" },
    { name: "Sunday", value: "sunday" },
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDays([...selectedDays, value]);
    } else {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    }
  };

  const handleAddDoctor = () => {
    setDoctorData({...doctorData,availability:selectedDays})
    addDocters(doctorData)
    notifySuccess("doctor added succssfully")
  };

  return (
    <div className="w-full flex flex-col items-center my-10 gap-5">
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-[80%] text-[25px] font-bold text-blue-400">
        <p>Add new Doctor</p>
      </div>
      <div className="w-[80%] p-4 border-2 rounded-md flex flex-col gap-3">
        <div className="w-full">
          <div className="font-bold">Doctor Name:</div>
          <input
            value={doctorData.name}
            onChange={(e) =>
              setDoctorData({ ...doctorData, name: e.target.value })
            }
            className="border-2 w-full rounded-md p-1 outline-none"
            type="text"
          />
        </div>
        <div>
          <div className="font-bold">Specialization:</div>
          <input
            value={doctorData.specialization}
            onChange={(e) =>
              setDoctorData({
                ...doctorData,
                specialization: e.target.value,
              })
            }
            className="border-2 w-full rounded-md p-1 outline-none"
            type="text"
          />
        </div>
        <div>
          <div className="font-bold">Availability:</div>
          {daysOfWeek.map((day) => (
            <label key={day.value} className="inline-flex pr-4 items-center">
              <input
                type="checkbox"
                value={day.value}
                checked={selectedDays.includes(day.value)}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="ml-2">{day.name}</span>
            </label>
          ))}
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={handleAddDoctor}
            className="p-2 border-2 bg-blue-400 rounded-md font-bold text-white"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
