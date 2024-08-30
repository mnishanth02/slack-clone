import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { SignInFlow } from "../types";

interface SignInCardProps {
  setSignInFlow: (flow: SignInFlow) => void;
}
const SignInCard = ({ setSignInFlow }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="space-y-2.5" onSubmit={handleSubmit}>
          <Input
            disabled={false}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            disabled={false}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button className="w-full" size="lg" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex gap-2.5">
          <Button className="relative w-full" onClick={() => {}} variant="secondary" size="lg" disabled={false}>
            <FcGoogle className="absolute left-5 size-5" />
            Google
          </Button>
          <Button className="relative w-full" onClick={() => {}} variant="secondary" size="lg" disabled={false}>
            <FaGithub className="absolute left-5 size-5" />
            GitHub
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer text-primary hover:text-primary/80 hover:underline"
            onClick={() => setSignInFlow("SignUp")}
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
