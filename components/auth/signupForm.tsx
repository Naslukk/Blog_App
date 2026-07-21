"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signupSchema } from "@/lib/validations/auth";
import { signup } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  async function onSubmit(data: SignupFormData) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      const result = await signup(formData);

      if (result.success) {
        toast.success(result.message || "Account created successfully!");
        router.push("/home");
      } else {
        toast.error(result.message || "Signup failed. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader 
      >
        <CardTitle className="text-2xl text-center">
          Create your account
        </CardTitle>

        <CardDescription className="text-center">
          Sign up to start writing blogs.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
  <Label htmlFor="password">Password</Label>

  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="********"
      {...register("password")}
      className="pr-10"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  </div>

  {errors.password && (
    <p className="text-sm text-red-500">
      {errors.password.message}
    </p>
  )}
</div>
          <div className="space-y-2">
  <Label htmlFor="confirmPassword">
    Confirm Password
  </Label>

  <div className="relative">
    <Input
      id="confirmPassword"
      type={showConfirmPassword ? "text" : "password"}
      placeholder="********"
      {...register("confirmPassword")}
      className="pr-10"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    >
      {showConfirmPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  </div>

  {errors.confirmPassword && (
    <p className="text-sm text-red-500">
      {errors.confirmPassword.message}
    </p>
  )}
</div>

          <Button
            type="submit"
            className="w-full h-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center">
        <p className="text-sm text-muted-foreground ">
          You have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </p>

      </CardFooter>
      
    </Card>
  );
}