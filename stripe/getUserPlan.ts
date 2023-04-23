import firebase from "../firebase/firebaseClient";

export default async function getUserPlan(): Promise<string> {
  await firebase.auth().currentUser?.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();

  return decodedToken?.claims?.stripeRole || "basic";
}
