import { loadStripe } from "@stripe/stripe-js";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../CheckoutForm/CheckoutForm";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet-async";

const Payment = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  console.log(cart);

  const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Payment</title>
      </Helmet>
      <SectionTitile subHeading={"Please Payment"} heading={"payment"} />

      <h1 className="text-3xl my-5 text-center">Payment Card</h1>

      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
