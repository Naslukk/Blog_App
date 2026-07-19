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

const LoginSchema = z
  .object({
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: LoginFormData) {
    console.log(data);

    // Later:
    // await signup(data)
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader 
      >
        <CardTitle className="text-2xl text-center">
          Sign in to your account
        </CardTitle>

        <CardDescription className="text-center">
          Sign in to continue writing blogs.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

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


          <Button
            type="submit"
            className="w-full h-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>

      </CardFooter>
    </Card>
  );
}