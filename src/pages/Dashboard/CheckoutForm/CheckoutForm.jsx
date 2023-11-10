import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
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

  // step 6: creating a payment intent form getting the api from server
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, []);

  console.log("client Secret ", clientSecret);

  // step 2: payment Card in Stripe
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
    // step 3: Create a Card with Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setProcessing(true);

    // step 4: Showing Error using a Hook for card if occur
    if (error) {
      console.log("Error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("PaymentMethod", paymentMethod);
    }

    // step 5: Created a payment Intent for starting the payment
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

    // step 7: payment is completed and sent the price and payment information

    if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      const payment = {
        email: user?.email,
        TransactionId: paymentIntent.id,
        price,
        date: new Date(),
        quantity: cart.length,
        cartItems: cart.map((item) => item._id),
        menuItemId: cart.map((item) => item.menuItemId),
        status: "service pending",
        itemName: cart.map((item) => item.name),
      };

      // step 7: post data for payment by creating an api from backend
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

        {/* The button will be disabled after the payment submission */}
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
