import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

const locales = (process.env.NEXT_PUBLIC_INTL_LOCALES || "en").split(",");
const defaultLocale = process.env.NEXT_PUBLIC_INTL_DEFAULT_LOCALE || "en";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  localePrefix: "as-needed",

  localeDetection: false,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
