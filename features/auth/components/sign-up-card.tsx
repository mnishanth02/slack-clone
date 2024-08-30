import React, { useState } from "react";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlertIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { SignInFlow } from "../types";

interface SignUpCardProps {
  setSignInFlow: (flow: SignInFlow) => void;
}
const SignUpCard = ({ setSignInFlow }: SignUpCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | "">("");
  const [pending, setPending] = useState(false);

  const { signIn } = useAuthActions();

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    void signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => setPending(false));
  };

  const handleProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    if (value === "github") {
      void signIn("github").finally(() => setPending(false));
    } else {
      void signIn("google").finally(() => setPending(false));
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="mx-6 mb-6 flex items-center gap-x-2 rounded-md bg-destructive p-3 text-sm text-destructive-foreground">
          <TriangleAlertIcon className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5">
        <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
          <Input
            disabled={pending}
            placeholder="Full name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            disabled={pending}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            disabled={pending}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            disabled={pending}
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button disabled={pending} className="w-full" size="lg">
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex gap-2.5">
          <Button
            disabled={pending}
            className="relative w-full"
            onClick={() => handleProviderSignUp("google")}
            variant="secondary"
            size="lg"
          >
            <FcGoogle className="absolute left-5 size-5" />
            Google
          </Button>
          <Button
            disabled={pending}
            className="relative w-full"
            onClick={() => handleProviderSignUp("github")}
            variant="secondary"
            size="lg"
          >
            <FaGithub className="absolute left-5 size-5" />
            GitHub
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-primary hover:text-primary/80 hover:underline"
            onClick={() => setSignInFlow("SignIn")}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
