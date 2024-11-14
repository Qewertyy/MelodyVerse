import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import RegisterForm from "../../components/auth/register";
import { Icons } from "../../components/icons";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:grid lg:grid-cols-2">
      <a
        href="/Login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </a>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.React className="h-8 w-8 mr-2" />
          <span>MelodyVerse</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Life without music would be a mistake.&rdquo;
            </p>
            <footer className="text-sm">Friedrich Nietzsche</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex justify-center items-center w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-4">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking SignUp, you agree to our{" "}
            <a
              href="/#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
