import React, { useState, useEffect } from "react";
import { getDepartment } from "../utils/api";
import { addHospital } from "../utils/api";
import { addDepartment } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddHospital() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
  const [hospitalData,setHospitalData] = useState({
    name: "",
    location: "",
    departments:selectedDepartmentIds
  })
  const [departmentData,setDepartmentData] = useState({
    name:"",
    description:""
  })

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

const notifyError = (message) => {
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
};
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDepartment();
        setDepartments(response);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchData(selectedDepartmentIds);
  }, []);

  const toggleDepartmentSelection = (id) => {
    if (selectedDepartmentIds.includes(id)) {
      setSelectedDepartmentIds(selectedDepartmentIds.filter((deptId) => deptId !== id));
    } else {
      setSelectedDepartmentIds([...selectedDepartmentIds, id]);
    }
  };

  const handleAddHospital = () =>{
    notifyError("Error while adding department")
    addHospital(hospitalData)
  }

  const handleAddDepartment = async () => {
    try {
      const data = await addDepartment(departmentData);
      if(data?.response?.status != 201 && data?.status != 201){
        notifyError("Error while adding department")
        return
      }
      const response = await getDepartment();
      setDepartments(response);
      console.log(data)
      notifySuccess("Department added successfully")
    } catch (error) {
      notifyError("Error while adding department")
      console.error("Error adding department:", error);
    }
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
      <div className="w-[80%] text-[25px] font-bold text-blue-400"><p>Add new department</p></div>
      <div className="w-[80%] p-4 border-2 rounded-md flex flex-col gap-3">
        <div className="w-full">
          <div className="font-bold">Department Name:</div>
          <input value={departmentData.name} onChange={(e)=>setDepartmentData({...departmentData,name:e.target.value})} className="border-2 w-full rounded-md p-1 outline-none" type="text" />
        </div>
        <div>
          <div className="font-bold">Description:</div>
          <input value={departmentData.description} onChange={(e)=>setDepartmentData({...departmentData,description:e.target.value})} className="border-2 w-full rounded-md p-1 outline-none" type="text" />
        </div>
        <div className="w-full flex justify-end">
          <button onClick={handleAddDepartment} className="p-2 border-2 bg-blue-400 rounded-md font-bold text-white">
            Add Department
          </button>
        </div>
      </div>
      <div className="w-[80%] text-[25px] font-bold text-blue-400"><p>Add new Hospital</p></div>

      <div className="w-[80%] p-4 border-2 rounded-md flex flex-col gap-3">
        <div className="w-full">
          <div className="font-bold">Hospital Name:</div>
          <input value={hospitalData.name} onChange={(e)=>setHospitalData({...hospitalData,name:e.target.value})} className="border-2 w-full rounded-md p-1 outline-none" type="text" />
        </div>
        <div>
          <div className="font-bold">Location:</div>
          <input value={hospitalData.location} onChange={(e)=>setHospitalData({...hospitalData,location:e.target.value})} className="border-2 w-full rounded-md p-1 outline-none" type="text" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold">Select Department:</div>
          <div className="flex w-full overflow-x-auto gap-4">
            {departments.map((dept) => (
              <div
                key={dept._id}
                className={`border-2 p-2 rounded-md cursor-pointer ${
                  selectedDepartmentIds.includes(dept._id) ? "border-blue-400" : ""
                }`}
                onClick={() => toggleDepartmentSelection(dept._id)}
              >
                <div className="flex w-[400px] gap-2">
                  <div className="font-bold">Name:</div>
                  <div>{dept.name}</div>
                </div>
                <div>
                  <div className="font-bold">Description:</div>
                  <div>{dept.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button onClick={handleAddHospital} className="p-2 border-2 bg-blue-400 rounded-md font-bold text-white">
            Add Hospital
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHospital;
