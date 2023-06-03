import * as H from "./styles";
import LinkTo from "../LinkTo";

export default function Header() {
    return (
        <H.Header>
            <nav>
                <H.Menu role="menu">
                    <LinkTo route="/categories" routeName="Categorias" />
                    <LinkTo route="/products" routeName="Produtos" />
                    <LinkTo route="/budgets" routeName="Clientes" />
                    <LinkTo route="/productsBudgets" routeName="Orçamentos" />
                </H.Menu>
            </nav>
        </H.Header>
    );
};