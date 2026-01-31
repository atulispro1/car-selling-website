import { useTheme } from "../context/ThemeContext";
import "./../styles/themeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="icon">
        {theme === "light" ? "🌞" : "🌙"}
      </span>
    </button>
  );
}
