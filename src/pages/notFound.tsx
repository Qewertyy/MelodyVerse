import { Button } from "../components/ui/button";

export default function notFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-3">
      <div className="flex flex-row items-center justify-center space-x-2">
        <div className="text-2xl border-r-2 border-[#ebe7e74d] px-2">404</div>
        <div>This page could not be found.</div>
      </div>
      <Button onClick={()=>window.history.back()} >
        Back
      </Button>
    </div>
  );
}
