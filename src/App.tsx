import AppRouter from "./routes";
import Layout from "./components/Layout";
import { ResetCss } from './styles/global';
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <ResetCss />
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
};
