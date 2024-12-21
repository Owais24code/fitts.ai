"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleUserLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-[#e478c7] to-[#27072a] p-10 shadow-md">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="text-white"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 text-white" />
              ) : (
                <EyeIcon className="h-4 w-4 text-slate-100" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <Button
        className="w-full bg-[#a840bf] hover:bg-[#561853] shadow-md"
        onClick={handleUserLogin}
      >
        Sign In
      </Button>

      <p className="text-center text-xs text-gray-100">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-[#a840bf] hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
}
