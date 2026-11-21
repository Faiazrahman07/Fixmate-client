"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import AuthSwitch from "@/components/Auth/AuthSwitch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [role, setRole] = useState<"customer" | "technician">("customer");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    const values: SignUpFormValues = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    };

   
    if (!values.name || !values.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Password validation
    if (!values.password || !values.confirmPassword) {
      toast.error("Please enter your password");
      return;
    }

    if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        role,
        callbackURL: "/sign-in",

        
      });

      if (error) {
        setError(error.message || "Signup failed");
        toast.error(error.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg shadow-primary/5">
      <CardHeader>
        <AuthSwitch active="signup" />

        <CardTitle className="mt-4 text-xl">
          Create your account
        </CardTitle>

        <CardDescription>
          Join FixMate to book trusted professionals near you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full name</Label>

            <div className="relative">
              <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                className="h-10 pl-9"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>

            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-10 pl-9"
                required
              />
            </div>
          </div>

      
          <div className="flex flex-col gap-3">
            <Label>Select Your Role</Label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`rounded-lg border p-4 text-sm font-medium transition ${
                  role === "customer"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input hover:border-primary"
                }`}
              >
                Customer
              </button>

              <button
                type="button"
                onClick={() => setRole("technician")}
                className={`rounded-lg border p-4 text-sm font-medium transition ${
                  role === "technician"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input hover:border-primary"
                }`}
              >
                Technician
              </button>
            </div>
          </div>

          
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password"
                className="pr-10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="pr-10"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="mt-1 h-10 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;