import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../containers/Payment/styles.css";
import axios from "axios";

const CheckoutForm = ({ productName, totalPrice }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Récupérer les données bancaires renseignées
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          amount: totalPrice,
          title: productName,
          token: stripeResponse.token.id,
        }
      );

      if (response.data) {
        setIsPaid(true);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isPaid ? (
    <p>Merci pour votre achat.</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
