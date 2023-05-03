import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<span>404 ERROR</span>} />
        </Routes>
    );
}
