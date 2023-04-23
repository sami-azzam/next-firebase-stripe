import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../stripe/createCheckoutSession";
import usePlanStatus from "../stripe/usePlanStatus";

export default function Home() {
  const [user, userLoading] = useAuthState(firebase.auth() as any);
  const userPlan = usePlanStatus(user as any);

  return (
    <div className={styles.container}>
      {!user && userLoading && <h1>Loading...</h1>}
      {!user && !userLoading && <Login />}
      {user && !userLoading && (
        <div>
          <h1>Hello, {user.displayName}</h1>
          {userPlan == "basic" ? (<>
            <button onClick={() => createCheckoutSession(user.uid, "price_1Mzr8fJKvd8jZpiVj21T4tyz")}>
              Subscribe to Starter!
            </button>
            <button onClick={() => createCheckoutSession(user.uid, "price_1MzrADJKvd8jZpiVnOnbZa5t")}>
              Subscribe to Pro!
            </button>
            </>
            
          ) : (
            <h2>Have a cookie 🍪 {userPlan == "starter" ? "Starter" : "Pro"} Plan customer!</h2>

          )}
        </div>
      )}
    </div>
  );
}
