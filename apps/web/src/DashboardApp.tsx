import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { SurlDashboardPage } from "@/pages/SurlDashboardPage";

export function DashboardApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SurlDashboardPage />} path="/" />
        <Route element={<SurlDashboardPage />} path="*" />
      </Routes>
      <Toaster richColors />
    </BrowserRouter>
  );
}
