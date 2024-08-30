import React, { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlertIcon } from "lucide-react";
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
  const [error, setError] = useState<string | "">("");
  const [pending, setPending] = useState(false);

  const { signIn } = useAuthActions();

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    void signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => setPending(false));
  };

  const handleProviderSignIn = (value: "github" | "google") => {
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
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="mx-6 mb-6 flex items-center gap-x-2 rounded-md bg-destructive p-3 text-sm text-destructive-foreground">
          <TriangleAlertIcon className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5">
        <form className="space-y-2.5" onSubmit={onPasswordSignIn}>
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
          <Button className="w-full" size="lg" disabled={pending}>
            {pending ? "Loading..." : "Continue"}
          </Button>
        </form>
        <Separator />
        <div className="flex gap-2.5">
          <Button
            className="relative w-full"
            onClick={() => handleProviderSignIn("google")}
            variant="secondary"
            size="lg"
            disabled={pending}
          >
            <FcGoogle className="absolute left-5 size-5" />
            Google
          </Button>
          <Button
            className="relative w-full"
            onClick={() => handleProviderSignIn("github")}
            variant="secondary"
            size="lg"
            disabled={pending}
          >
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
