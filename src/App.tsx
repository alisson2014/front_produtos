import AppRouter from "routes";
import { ResetCss } from "styles/globals";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <ResetCss />
      <AppRouter />
    </BrowserRouter>
  );
};
