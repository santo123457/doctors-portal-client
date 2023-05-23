import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import AvailableOption from "./AvailableOption";

const AvailableAppointments = ({ selectedDate }) => {
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  useEffect(() => {
    fetch("appointmentOptions.json")
      .then((res) => res.json())
      .then((data) => setAppointmentOptions(data));
  });
  return (
    <section className="mt-16">
      <p className="text-center text-secondary font-bold ">
        Available Appointments on{format(selectedDate, "PP")}{" "}
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {
            appointmentOptions.map(option=><AvailableOption
            key={option._id}
            option ={option}
            ></AvailableOption>)
        }
      </div>
    </section>
  );
};

export default AvailableAppointments;
