import * as H from "./styles";
import LinkTo from "../LinkTo";

export default function Header() {
    return (
        <H.Header>
            <nav>
                <H.Menu>
                    <LinkTo route="/categories" routeName="Categorias" />
                    <LinkTo route="/products" routeName="Produtos" />
                </H.Menu>
            </nav>
        </H.Header>
    );
};