/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "i18next";
import { useState } from "react";
import { initReactI18next } from "react-i18next";
type Locales = "en" | "zh";
const defaultLocale: Locales = "en";
const locales = new Set<Locales>([defaultLocale, "zh"]);
const loadedLocales = new Set<Locales>([]);
const resources = {} as {
  [key: string]: {
    translation: {
      [key: string]: object;
    };
  };
};

const load = (locale: Locales) => {
  if (loadedLocales.has(locale)) {
    i18n.changeLanguage(locale);
  } else {
    loadedLocales.add(locale);
    let modules: any;
    if (locale === "zh") {
      modules = require.context("./modules", true, /zh.json$/, "lazy");
    }
    if (locale === "en") {
      modules = require.context("./modules", true, /en.json$/, "lazy");
    }

    Promise.all(
      modules.keys().map((url: any) => {
        const [ns, lng] = url
          .replace(/modules|\.json|\.?\/?/g, "")
          .split("locales");

        return modules(url).then((resources: any) => {
          if (ns === "global") {
            return Object.keys(resources).map((key) => {
              return [lng, key, resources[key]];
            });
          }
          return [lng, ns, resources];
        });
      }),
    ).then((resp: any) => {
      const result = resp.reduce(
        (result: any, info: any) => {
          if (typeof info.at(0) === "string") {
            const [lng, ns, data] = info;
            if (ns && data) {
              result.lng = lng;
              result.translation[ns] = data;
            }
          } else {
            info.forEach((_info: any) => {
              const [lng, ns, data] = _info;
              if (ns && data) {
                result.lng = lng;
                result.translation[ns] = data;
              }
            });
          }

          return result;
        },
        {
          lng: "",
          translation: {},
        },
      );

      i18n.addResourceBundle(result.lng, "translation", result.translation);
      i18n.changeLanguage(locale);
    });
  }
};

i18n.use(initReactI18next).init({
  lng: defaultLocale,
  resources,
});

(() => load(defaultLocale))();

export const useLocales = (): {
  readonly value: Locales;
  change: (lng: Locales) => void;
} => {
  const [value, update] = useState<Locales>(defaultLocale);

  return {
    value,
    change: (lng: Locales) => {
      if (lng === value) return;
      if (locales.has(lng)) {
        load(lng);
        update(lng);
      }
    },
  };
};

export { useTranslation } from "react-i18next";
