"use client";

import React, { useState } from "react";

import { SignInFlow } from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

const AuthScreen = () => {
  const [signInFlow, setSignInFlow] = useState<SignInFlow>("SignIn");

  return (
    <div className="flex items-center justify-center md:h-auto md:w-[420px]">
      {signInFlow === "SignIn" ? (
        <SignInCard setSignInFlow={setSignInFlow} />
      ) : (
        <SignUpCard setSignInFlow={setSignInFlow} />
      )}
    </div>
  );
};

export default AuthScreen;
