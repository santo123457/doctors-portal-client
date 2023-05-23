import React from "react";
import chair from "../../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header>
      <div className="hero my-6  bg-[url('/src/assets/images/bg.png')]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chair} alt="" className="max-w-sm rounded-lg shadow-2xl" />
          <div className="me-6">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            ></DayPicker>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
