import { format } from "date-fns";
import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
  const { user } = useContext(AuthContext);
  const { name, slots, price } = treatment; //treatment is different name of option;
  const date = format(selectedDate, "PP");
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      treatment: treatment.name,
      patient: name,
      slot,
      email,
      phone,
      price,
    };
    fetch("https://doctors-portal-server-rho-murex.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("Booking Confirmed Successfully");
          refetch();
        } else {
          toast.error(data.message);
        }
      });

    setTreatment(null);
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm text-white btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-5 "
          >
            <input
              type="text"
              className="input input-bordered w-full "
              value={date}
              disabled
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot, index) => (
                <option value={slot} key={index}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full "
              defaultValue={user?.displayName}
              disabled
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered w-full "
              defaultValue={user?.email}
              disabled
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full "
            />
            <input
              className="btn btn-accent w-4/5 mx-auto text-white mt-5"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
