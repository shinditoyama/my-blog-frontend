import Link from "next/link";
import DarkMode from "./DarkMode";

export default function Header() {
  return (
    <header className="py-6 border-b-2">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-semibold cursor-pointer">Meu Blog</div>
        </Link>
        <div>
          <DarkMode />
        </div>
      </div>
    </header>
  );
}
