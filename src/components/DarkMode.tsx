import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkMode() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
      <button
        type="button"
        className="p-2 rounded-md hover:ring-2 hover:ring-gray-300"
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      >
        {currentTheme === "dark" ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </button>
    );
  };

  return <>{renderThemeChanger()}</>;
}
