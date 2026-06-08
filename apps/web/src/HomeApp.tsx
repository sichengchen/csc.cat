import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { PasteViewPage } from "@/pages/PasteViewPage";

export function HomeApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PasteViewPage />} path="/p/:slug" />
        <Route element={<HomePage />} path="/" />
        <Route element={<HomePage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
