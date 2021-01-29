import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./styles.css";
import CheckoutForm from "../../components/CheckoutForm";
import ProductSummary from "../../components/ProductSummary";

const Payment = () => {
  const location = useLocation();
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
  const {
    productName,
    totalPrice,
    protectionFees,
    shippingFees,
    price,
  } = location.state;

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <ProductSummary
          price={price}
          protectionFees={protectionFees}
          shippingFees={shippingFees}
          totalPrice={totalPrice}
        />
        <div className="payment-card">
          <div className="content">
            Il ne vous reste plus qu'un étape pour vous offrir
            <span className="bold"> {productName}</span>. Vous allez payer{" "}
            <span className="bold">{totalPrice} €</span> (frais de protection et
            frais de port inclus).
            <div className="divider" />
            <Elements stripe={stripePromise}>
              <CheckoutForm productName={productName} totalPrice={totalPrice} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
