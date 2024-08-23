import { signUpData } from "../types";
import { MainNav } from "./MainNav";
import { Search } from "./search";
import { UserNav } from "./UserNav";

export default function DashboardPage({user,logout}:{user:signUpData,logout:()=>void}) {
    if (!user) {
        return null;
    };
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 justify-between">
            <h1 className="text-md font-medium text-muted-foreground transition-colors hover:text-primary">
              MelodyVerse
            </h1>
            <MainNav className="mx-6" />
            <div className="flex items-center space-x-4">
                <Search />
              <UserNav user={user} logout={logout} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
        </div>
      </div>
    </>
  );
}
