import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-8 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}