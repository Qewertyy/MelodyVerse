import { cn } from "../lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <a
        href="/#"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </a>
      <a
        href="/#"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Artists
      </a>
      <a
        href="/#"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Music
      </a>
      <a
        href="/#"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Albums
      </a>
    </nav>
  );
}
