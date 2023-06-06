import AppRouter from "routes";
import { ResetCss } from "styles/globals";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


export default function App() {
  return (
    <BrowserRouter>
      <ResetCss />
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
};
