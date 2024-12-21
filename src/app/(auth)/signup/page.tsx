import { SignUpForm } from "@/components/ui/sign-up-form";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden w-1/2 bg-[#5b187f] lg:flex items-center justify-center p-8 relative">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src="/"
            alt="image"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute top-8 left-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Find 3D Objects, Mockups
            <br />
            and Illustrations here
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">English</span>
              <span className="text-sm text-gray-500">(UK)</span>
            </div>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
