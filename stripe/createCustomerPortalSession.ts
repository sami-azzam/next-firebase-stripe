import firebase from "../firebase/firebaseClient";

export async function createCustomerPortalSession(
  return_url: string = window.location.origin
) {
  const functionRef = firebase
    .app()
    .functions()
    .httpsCallable("ext-firestore-stripe-payments-createPortalLink");
  const { data } = await functionRef({
    return_url,
  });
  return data;
}
