import React from "react";
import { useDarkmode } from "@style/core";
import { useTranslation, useLocales } from "@i18n";
import { getYiyan } from "@/overview/service";
export default function Overview() {
  const darkMode = useDarkmode();
  const lng = useLocales();

  const [t] = useTranslation();

  const onGetYiyan = () => {
    getYiyan().then((resp) => console.log(resp.result.author));
  };
  return (
    <div className="w-full h-full flex flex-1 justify-center items-center">
      <div className="flex absolute top-2 right-2">
        <div
          key={darkMode.value}
          className="rounded-full p-2 cursor-pointer shadow-md shadow-[var(--primary-color)]"
          onClick={() => {
            lng.change(lng.value === "zh" ? "en" : "zh");
          }}
        >
          {lng.value}
        </div>
        <div
          className="rounded-full p-2 cursor-pointer shadow-md shadow-[var(--primary-color)] mx-2"
          onClick={onGetYiyan}
        >
          💌
        </div>
        <div
          className="rounded-full p-2 cursor-pointer shadow-md shadow-[var(--primary-color)]"
          onClick={() => darkMode.toggle()}
        >
          {darkMode.value === "light" ? "☀️" : "🔮"}
        </div>
      </div>
      <div
        className="w-[580px] h-[50px] rounded-full flex justify-center items-center mx-auto bg-white text-black cursor-pointer relative  shadow-md shadow-[var(--primary-color)] cursor-pointer hover:bg-[var(--primary-color)] hover:text-white"
        onClick={() => {
          window.open("https://github.com/ubuding/Webpack.React", "_blank");
        }}
      >
        <span className="text-yellow-500">
          {t("origin")}.{t("branches.name")}
        </span>
        <span className="mx-3">-</span>
        <span>{t("overview.introduction")}</span>
      </div>
    </div>
  );
}
