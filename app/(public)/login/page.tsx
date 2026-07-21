import LoginForm from "@/components/auth/loginForm";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
   const user = await verifySession();
  
    if (user) {
      redirect("/home");
    }
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <LoginForm />
    </main>
  );
}