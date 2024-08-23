import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Icons } from "../components/icons";

export function ErrorAlert({ error }: { error: string | string[] }) {
  let title,errorMessage: string = "";
  if (typeof error === "string") {
    title = "Error";
    errorMessage = error;
  } else if (error instanceof Array) {
    title = error.at(-1);
    errorMessage = error.slice(0, -1).join(", ");
  };
  console.log(title);
  console.log(errorMessage);
  return (
    <Alert variant="destructive" >
      <Icons.DangerIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
