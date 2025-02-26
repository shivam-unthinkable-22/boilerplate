import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { routing } from "@/i18n/routing";
import { Roboto } from "next/font/google";
import { META } from "@/constants/meta";
import theme from "@/theme";
import StoreProvider from "@/components/StoreProvider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = META.COMMON;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const localeConfig: { [key: string]: string } = {
    in: "en-IN",
  };

  return (
    <html lang={localeConfig[locale] || locale} className={roboto.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppRouterCacheProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
