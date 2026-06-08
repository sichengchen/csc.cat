import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";

export function HomeApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<HomePage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
