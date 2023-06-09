import React from "react";
import chair from '../../../assets/images/chair.png'
import PrimaryButton from "../../../Components/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="hero py-20 bg-[url('/src/assets/images/bg.png')]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={chair}
          className=" lg:w-1/2 rounded-lg shadow-2xl"
          alt=""
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link to="/appointment"><PrimaryButton>Get Started</PrimaryButton></Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
