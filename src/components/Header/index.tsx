import * as S from "./atoms";
import LinkTo from "../LinkTo";

export default function Header() {
    return (
        <S.Header>
            <S.Nav>
                <S.Menu>
                    <LinkTo route="/categorias" routeName="Categorias" />
                    <LinkTo route="/produtos" routeName="Produtos" />
                </S.Menu>
            </S.Nav>
        </S.Header>
    );
};