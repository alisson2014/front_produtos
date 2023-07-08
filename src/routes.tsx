import { Routes, Route } from "react-router-dom";
import { Home, Products } from "pages";
import Layout from "components/Layout";
import Register from "components/Register";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="categorias" element={<Home />} />
                <Route path="categorias/:id" element={<Register />} />
            </Route>
            <Route path="*" element={<span>404 ERROR</span>} />
        </Routes>
    );
}
