import { LeafIcon } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 flex justify-between items-center bg-primary dark:bg-primary">
      <div className="flex items-center space-x-2">
        <LeafIcon className="h-6 w-6 text-primary-foreground" />
        <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground">
          Gerenciando Oak
        </h1>
      </div>
      <ModeToggle />
    </header>
  );
}
