import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import LoginForm from "../../components/auth/login";
import { Icons } from "../../components/icons";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:grid lg:grid-cols-2">
      <a
        href="/SignUp"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        Sign Up
      </a>
      <div className="flex justify-center items-center w-full lg:p-8">
        <div className="w-full flex flex-col justify-center space-y-6 sm:w-[350px] p-4">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a
              href="/#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Forgot your password
            </a>
            ?
          </p>
        </div>
      </div>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex md:hidden">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.React className="h-8 w-8 mr-2" />
          <span>MelodyVerse</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;I wonder where i lost my way.&rdquo;
            </p>
            <footer className="text-sm">Kendrick Lamar</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
