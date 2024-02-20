import React, { useState, useEffect } from 'react';
import { addDocters,getDoctersData,UpdateDoctersData } from '../utils/api';

const DoctorProfile = () => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [availability, setAvailability] = useState('');
  const [isExistingProfile, setIsExistingProfile] = useState(false);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await getDoctersData(); 
        const  data  = response;
        if (data) {
          setName(data.name);
          setSpecialization(data.specialization);
          setAvailability(data.availability.join(', '));
          setIsExistingProfile(true);
        }
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    fetchDoctorProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorData = {
      name,
      specialization,
      availability: availability.split(',').map(avail => avail.trim())
    };

    try {
      if (isExistingProfile) {
        UpdateDoctersData(doctorData)
        alert('Doctor profile updated successfully');
      } else {
      console.log(doctorData)
        addDocters(doctorData)
        alert('Doctor profile created successfully');
      }
    } catch (error) {
      console.error('Error saving doctor profile:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Doctor Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-input rounded-md border-2 p-1 outline-none" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="specialization">Specialization:</label>
          <input type="text" id="specialization" name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="form-input rounded-md border-2 p-1 outline-none" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="availability">Availability:</label>
          <input type="text" id="availability" name="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} className="form-input rounded-md border-2 p-1 outline-none" placeholder="Enter availability separated by commas" />
        </div>
        <div className="flex items-center justify-end w-full">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">{isExistingProfile ? 'Update' : 'Create'}</button>
          {isExistingProfile && <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>}
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
