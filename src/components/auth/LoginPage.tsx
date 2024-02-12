import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="w-full flex justify-center items-center h-full mx-auto">
      <SignIn />
    </div>
  );
}
