import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Icons } from "../components/icons";

export function ErrorAlert({ error }: { error: string | string[] }) {
  let errorMessage: string = "";
  if (typeof error === "string") {
    errorMessage = error;
  } else if (error instanceof Array) {
    errorMessage = error.join(", ");
  };
  return (
    <Alert variant="destructive" >
      <Icons.DangerIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
