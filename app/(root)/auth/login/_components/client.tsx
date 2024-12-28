"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
export const LoginPageClient = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Quick Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          className="flex items-center w-full gap-3"
          onClick={() => {
            signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
          }}
        >
          <FaGoogle /> Continue with google
        </Button>
      </CardContent>
    </Card>
  );
};
