import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ bookingData }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transitionId, setTransitionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const { price, email, patient, _id } = bookingData;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://doctors-portal-server-rho-murex.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patient,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // store payment info into database
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
      };

      fetch("https://doctors-portal-server-rho-murex.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Congrats! your payment completed");
            setTransitionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-red-500">{cardError.message}</p>
      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your TransitionId: <span className="font-bold">{transitionId}</span>
          </p>
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-sm mt-4 btn-primary"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
