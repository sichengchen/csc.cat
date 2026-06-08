import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { PasteDashboardPage } from "@/pages/PasteDashboardPage";
import { SurlDashboardPage } from "@/pages/SurlDashboardPage";

export type DashboardKind = "surl" | "paste";

type DashboardAppProps = {
  kind: DashboardKind;
};

export function DashboardApp({ kind }: DashboardAppProps) {
  const DashboardPage = kind === "paste" ? PasteDashboardPage : SurlDashboardPage;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardPage />} path="/" />
        <Route element={<DashboardPage />} path="*" />
      </Routes>
      <Toaster richColors />
    </BrowserRouter>
  );
}
