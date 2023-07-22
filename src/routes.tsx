import { Routes, Route } from "react-router-dom";
import { Home, Products } from "pages";
import Layout from "components/Layout";
import FormCategorie from "components/Forms/FormCategorie";
import FormProduct from "components/Forms/FormProduct";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="categorias" element={<Home />} />
                <Route path="categorias/:id" element={<FormCategorie />} />
                <Route path="produtos" element={<Products />} />
                <Route path="produtos/:id" element={<FormProduct />} />
            </Route>
            <Route path="*" element={<span>404 ERROR</span>} />
        </Routes>
    );
}
