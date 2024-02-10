import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="w-full h-full mx-auto">
      <SignIn />
    </div>
  );
}
