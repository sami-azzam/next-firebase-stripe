import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe("pk_test_51MWfO2JKvd8jZpiVJn8sWo6nd3cyjC7OkWIorg2sQxwZRA0wFDlxZKElVJeYI1oaGFaAmEmhjeAocx3Aq653xjao00ffLcLRqR");
  }
  return stripePromise;
};

export default initializeStripe;
