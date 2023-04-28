import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../stripe/createCheckoutSession";
import usePlanStatus from "../stripe/usePlanStatus";
import { createCustomerPortalSession } from "../stripe/createCustomerPortalSession";
import { useRouter } from "next/router";
import planType from "../stripe/planTypes";

export default function Home() {
  const [user, userLoading] = useAuthState(firebase.auth() as any);
  const router = useRouter();
  const userPlan = usePlanStatus(user as any);

  const onManage = async () => {
    const session = await createCustomerPortalSession();
    router.push(session.url);
  };

  return (
    <div className={styles.container}>
      {!user && userLoading && <h1>Loading...</h1>}
      {!user && !userLoading && <Login />}
      {user && !userLoading && (
        <div>
          <h1>Hello, {user.displayName}</h1>
          {userPlan == planType.logged_out ||
          userPlan == planType.non_member ? (
            <>
              <button
                onClick={() =>
                  createCheckoutSession(
                    user.uid,
                    "price_1Mzr8fJKvd8jZpiVj21T4tyz"
                  )
                }
              >
                Subscribe to Starter!
              </button>
              <button
                onClick={() =>
                  createCheckoutSession(
                    user.uid,
                    "price_1MzrADJKvd8jZpiVnOnbZa5t"
                  )
                }
              >
                Subscribe to Pro!
              </button>
            </>
          ) : (
            <>
              <h2>
                Have a cookie 🍪{" "}
                {userPlan == planType.starter ? "Starter" : "Pro"} Plan
                customer!
              </h2>
              <button onClick={() => firebase.auth().signOut()}>Logout</button>
              <button onClick={onManage}>Manage Plan</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
