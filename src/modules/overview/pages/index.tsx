import React from "react";
import clsx from "clsx";
import { useTranslation, useLocales } from "@i18n";
import { getYiyan } from "@/overview/service";
import { useDarkmode } from "@style/core";
import { useGlobalStore } from "@/global/store";
import { useOverviewStore } from "@/overview/store";
export default function Overview() {
  const darkMode = useDarkmode();
  const lng = useLocales();
  const [t] = useTranslation();

  const GlobalStore = useGlobalStore();
  const OverviewStore = useOverviewStore();

  const onGetYiyan = () => {
    getYiyan().then((resp) => console.log(resp.result.author));
  };
  return (
    <div
      className={clsx(
        "w-full h-full",
        "flex flex-col flex-1 justify-center items-center",
      )}
    >
      <div className={clsx("flex", "absolute top-2 right-2")}>
        <div
          className="rounded-full p-2 cursor-pointer shadow-md shadow-[var(--primary-color)]"
          onClick={() => {
            lng.change(lng.value === "zh" ? "en" : "zh");
          }}
        >
          {lng.value}
        </div>
        <div
          className={clsx(
            "rounded-full cursor-pointer",
            "p-2 mx-2",
            "shadow-md shadow-primary ",
          )}
          onClick={onGetYiyan}
        >
          💌
        </div>
        <div
          className={clsx(
            "rounded-full cursor-pointer",
            "p-2",
            "shadow-md shadow-primary",
          )}
          onClick={() => darkMode.toggle()}
        >
          {darkMode.value === "light" ? "☀️" : "🔮"}
        </div>
      </div>

      <div
        className={clsx(
          "w-[580px] h-[50px] relative rounded-full",
          "mx-auto mb-8",
          "flex justify-center items-center",
          "shadow-md shadow-primary cursor-pointer",
          "bg-white text-black",
          "hover:bg-primary hover:text-white",
        )}
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

      <div>
        <span
          className="cursor-pointer"
          onClick={() => GlobalStore.increase(GlobalStore.count + 1)}
        >
          <span className="inline-block w-28">Global:</span>
          <span className="mr-8 text-primary">{GlobalStore.count}</span>
        </span>

        <span
          className="cursor-pointer"
          onClick={() => OverviewStore.increase(OverviewStore.count + 1)}
        >
          <span className="inline-block w-28">Overview:</span>
          <span className="text-primary">{OverviewStore.double()}</span>
        </span>
      </div>
    </div>
  );
}
