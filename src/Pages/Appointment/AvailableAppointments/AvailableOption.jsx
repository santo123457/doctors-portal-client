import React from "react";

const AvailableOption = ({ option,setTreatment }) => {
  const { name, slots,price } = option;
  
  return (
    <div className="card w-96 shadow-xl">
      <div className="card-body text-center">
        <h2 className=" font-semibold text-2xl text-primary">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <p><small>Price: ${price}</small></p>
        <div className="card-actions justify-center">
          <label disabled={slots.length === 0} htmlFor="booking-modal" className="btn btn-primary text-white" onClick={()=>setTreatment(option)}>
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AvailableOption;
