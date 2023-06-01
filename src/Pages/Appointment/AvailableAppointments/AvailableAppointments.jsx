import { format } from "date-fns";
import React, { useState } from "react";
import AvailableOption from "./AvailableOption";
import BookingModal from "../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const AvailableAppointments = ({ selectedDate }) => {
  // const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);

  const date = format(selectedDate, "PP");

  // const {data : appointmentOptions , isLoading} /
  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: async () => {
      const res = await fetch(
        `https://doctors-portal-server-rho-murex.vercel.app/appointmentOptions?date=${date}`
      );
      const data = await res.json();
      return data;
    },
  });

  // queryFn : ()=>{
  //   fetch("https://doctors-portal-server-rho-murex.vercel.app/appointmentOptions")
  //   .then((res) => res.json())
  // }

  if (isLoading) {
    return <Loading></Loading>;
  }
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
      {treatment && (
        <BookingModal
          treatment={treatment}
          setTreatment={setTreatment}
          selectedDate={selectedDate}
          refetch={refetch}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointments;
