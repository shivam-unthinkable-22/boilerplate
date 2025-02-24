import { META } from "@/constants/meta";
import Login from "@/ui/Login";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

export const metadata = META.HOME;

export default function HomePage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("login.title")}</h1>
      <Button variant="contained">Login</Button>
      <Login />
    </div>
  );
}
