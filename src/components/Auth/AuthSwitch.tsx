import Link from "next/link";
import { cn } from "@/lib/utils";

type AuthSwitchProps = {
  active: "signin" | "signup";
};

const authModes = [
  { key: "signin", label: "Sign in", href: "/signin" },
  { key: "signup", label: "Sign up", href: "/signup" },
] as const;

const AuthSwitch = ({ active }: AuthSwitchProps) => {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 text-sm font-medium">
      {authModes.map((mode) => (
        <Link
          key={mode.key}
          href={mode.href}
          aria-current={active === mode.key ? "page" : undefined}
          className={cn(
            "rounded-md px-3 py-1.5 text-center transition",
            active === mode.key
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {mode.label}
        </Link>
      ))}
    </div>
  );
};

export default AuthSwitch;
