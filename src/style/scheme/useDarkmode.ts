import { useMemo, useState } from "react";

const setClassList = (classs: "dark" | "light" | string, local = false) => {
  if (local) localStorage.setItem("color-scheme", classs);
  document.documentElement.classList.add(classs);
  classs === "light"
    ? document.documentElement.classList.remove("dark")
    : document.documentElement.classList.remove("light");
};

const init = () => {
  const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
  themeMedia.onchange = (e) => {
    const scheme = localStorage.getItem("color-scheme");
    if (scheme === "auto") {
      if (e.matches) {
        setClassList("light");
      } else {
        setClassList("dark");
      }
    }
  };
  const scheme = localStorage.getItem("color-scheme");

  if (scheme && scheme !== "auto") {
    setClassList(scheme);
  } else {
    localStorage.setItem("color-scheme", "auto");
    if (themeMedia.matches) {
      setClassList("light");
    } else {
      setClassList("dark");
    }
  }
};

init();

export const useDarkmode = () => {
  const [index, update] = useState(0);
  const value = useMemo(
    () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    [index],
  );

  return {
    value,
    enable: () => {
      setClassList("dark", true);
      update(index + 1);
    },
    disable: () => {
      setClassList("light", true);
      update(index + 1);
    },
    toggle: () => {
      const _value = value === "light" ? "dark" : "light";
      setClassList(_value, true);
      update(index + 1);
    },
  };
};
