import { Routes, Route } from "react-router-dom";
import { Home, Products } from "pages";
import Layout from "components/Layout";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="categories" element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="budgets" element={<div>Clientes</div>} />
                <Route path="productsBudgets" element={<div>Orçamentos</div>} />
            </Route>
            <Route path="*" element={<span>404 ERROR</span>} />
        </Routes>
    );
}
