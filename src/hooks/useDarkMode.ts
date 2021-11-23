import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const localDark = localStorage.getItem("dark");

  useEffect(() => {
    if (localDark == null) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  }, [localDark]);

  return isDark;
}
