import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
// import "../styles/common.css";

const CheckoutForm = ({ cart, price }) => {
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [processing, setProcessing] = useState(false);
  const [TransactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  console.log("client Secret ", clientSecret);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    // console.log(card);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setProcessing(true);

    if (error) {
      console.log("Error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("PaymentMethod", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        TransactionId: paymentIntent.id,
        price,
        items: cart.map((item) => item._id),
        itemName: cart.map((item) => item.name),
      };

      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          console.log(res.data.insertedId);
        }
      });
    }

    console.log("Payment-intent: ", paymentIntent);
  };

  return (
    <>
      <form className={"w-2/3 mx-auto"} onSubmit={handleSubmit}>
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
        <button
          className={"btn btn-sm btn-primary mt-3"}
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>

      {cardError && (
        <p className="text-red-500 font-semibold text-center">{cardError}</p>
      )}
      {TransactionId && (
        <p className="text-green-500 text-center my-5">
          Your transation Id is: {TransactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
