import React from "react";

function HospitalCard({ data }) {
  return (
    <div className="border-4 rounded-md p-5">
      <div>
        <p className="font-bold">{data.name}</p>
        <p>{data.address}</p>
      </div>
    </div>
  );
}

export default HospitalCard;
