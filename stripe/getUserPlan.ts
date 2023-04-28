import firebase from "../firebase/firebaseClient";
import planType from "./planTypes";

export default async function getUserPlan(): Promise<number> {
  await firebase.auth().currentUser?.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();
  if (decodedToken) {
    if (decodedToken.claims?.stripeRole) {
      return planType[parseInt(decodedToken.claims?.stripeRole)];
    }
    return planType.non_member;
  }
  return planType.logged_out;
}
