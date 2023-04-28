import { useState, useEffect } from "react";
import firebase from "../firebase/firebaseClient";
import getUserPlan from "./getUserPlan";
import planType from "./planTypes";

export default function usePlanStatus(user: firebase.User) {
  const [planStatus, setPlanStatus] = useState<number>(planType.logged_out);

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
