import { SignInForm } from "@/components/ui/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e478c7] to-[#27072a] justify-center items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <div className="mt-8 space-y-4 bg-red-900">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
