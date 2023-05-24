import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import AvailableOption from "./AvailableOption";
import BookingModal from "../BookingModal/BookingModal";

const AvailableAppointments = ({ selectedDate }) => {
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);
  
  
  useEffect(() => {
    fetch("appointmentOptions.json")
      .then((res) => res.json())
      .then((data) => setAppointmentOptions(data));
  });
  return (
    <section className="my-16">
      <p className="text-center text-secondary font-bold ">
        Available Appointments on{format(selectedDate, "PP")}{" "}
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-11/12 m-auto mt-6">
        {appointmentOptions.map((option) => (
          <AvailableOption
            key={option._id}
            option={option}
            setTreatment={setTreatment}
          ></AvailableOption>
        ))}
      </div>
      {
        treatment && <BookingModal treatment={treatment} setTreatment={setTreatment} selectedDate={selectedDate}></BookingModal>
      }
    </section>
  );
};

export default AvailableAppointments;
