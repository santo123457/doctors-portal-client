import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import Loading from "../../Shared/Loading/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PK);
const Payment = () => {
  const bookingData = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state ==="loading") {
    return <Loading></Loading>
    
  }
  const { treatment, price, appointmentDate, slot } = bookingData;
  return (
    <div>
      <h3 className="text-3xl">Payment for {treatment}</h3>
      <p className="text-xl">
        Please pay <strong>${price}</strong> for your appointment on{" "}
        {appointmentDate} at {slot}
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm bookingData={bookingData} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
