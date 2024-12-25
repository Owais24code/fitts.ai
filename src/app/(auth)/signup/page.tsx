"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-400">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Sign up
        </h2>
        <p className="text-sm text-center text-gray-600 mt-2">
          Create an account or{" "}
          <Link href="/signin" className="text-purple-500 hover:underline">
            Sign in
          </Link>
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-600">
              Email address
            </Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="username" className="text-gray-600">
              Username
            </Label>
            <Input id="username" type="text" placeholder="yourusername" />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-600">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="marketing"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <Label htmlFor="marketing" className="text-sm text-gray-600">
              I do not want to receive emails with advertising, news,
              suggestions, or marketing promotions
            </Label>
          </div>
          <Button
            type="button"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white"
            onClick={handleCreateAccount}
          >
            Sign up
          </Button>
          <p className="text-xs text-center text-gray-500">
            By signing up to create an account, you are accepting our{" "}
            <Link href="/terms" className="text-purple-500 hover:underline">
              terms of service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-purple-500 hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
