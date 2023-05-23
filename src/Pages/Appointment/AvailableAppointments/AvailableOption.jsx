import React from "react";

const AvailableOption = ({ option }) => {
  const {name,slots} = option;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-primary">{name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary text-white">Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default AvailableOption;
