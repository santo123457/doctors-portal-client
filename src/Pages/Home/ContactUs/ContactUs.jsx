import React from "react";
import img from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../Components/PrimaryButton/PrimaryButton";
const ContactUs = () => {
  return (
    <section
      style={{
        background: `url(${img})`,
        // backgroundSize : "cover"
      }}
      
    >
      <div className="w-[500px] mx-auto py-24">
        <div className="text-center">
          <h4 className="text-primary text-xl font-bold">Contact Us</h4>
          <h2 className="text-3xl text-white">Stay Connected With Us</h2>
        </div>

        <div>
          <form>
            <input
              type="text"
              placeholder="Email Address"
              className="input input-bordered w-full  my-5"
            />
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered w-full  mb-5"
            />

            <textarea
              placeholder="Your message"
              className="textarea textarea-bordered textarea-lg w-full "
            ></textarea>
            <div className="flex justify-center mt-5" >
            <PrimaryButton><div className="px-8">Submit</div></PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
