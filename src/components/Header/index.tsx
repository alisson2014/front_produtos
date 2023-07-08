import * as S from "./atoms";
import LinkTo from "../LinkTo";

export default function Header() {
    return (
        <S.Header>
            <S.Nav>
                <S.Menu>
                    <LinkTo route="/categories" routeName="Categorias" />
                    <LinkTo route="/products" routeName="Produtos" />
                </S.Menu>
            </S.Nav>
        </S.Header>
    );
};