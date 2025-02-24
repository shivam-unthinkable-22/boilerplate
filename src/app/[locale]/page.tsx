import { META } from "@/constants/meta";
import Home from "@/ui/Home";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

export const metadata = META.HOME;

export default function HomePage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <Button variant="contained">Text</Button>
      <Home />
    </div>
  );
}
