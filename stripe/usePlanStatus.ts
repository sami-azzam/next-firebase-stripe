import { useState, useEffect } from "react";
import firebase from "../firebase/firebaseClient";
import getUserPlan from "./getUserPlan";

export default function usePlanStatus(user: firebase.User) {
  const [planStatus, setPlanStatus] = useState<string>("basic");

  useEffect(() => {
    if (user) {
      const checkPlanStatus = async function () {
        setPlanStatus(await getUserPlan());
      };
      checkPlanStatus();
    }
  }, [user]);

  return planStatus;
}
