import { loadStripe } from "@stripe/stripe-js";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/CheckoutForm/CheckoutForm";

const Payment = () => {
  const stripePromise = loadStripe(
    `${import.meta.env.VITE_payment_gateway_pk}`
  );
  return (
    <div>
      <SectionTitile subHeading={"Please Payment"} heading={"payment"} />
      <h1 className="text-3xl">Payment page</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
