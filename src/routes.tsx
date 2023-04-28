import { Routes, Route } from "react-router-dom";
import { Home, Register } from "./pages";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<span>404 ERROR</span>} />
        </Routes>
    );
}
