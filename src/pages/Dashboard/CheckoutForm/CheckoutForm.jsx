// import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import "../styles/common.css";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) {
    return;
  }

  const card = elements.getElement(CardElement);

  if (card === null) {
    return;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
