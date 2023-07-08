import {
    BsFacebook,
    BsInstagram,
    BsTwitter
} from "react-icons/bs";
import * as S from "./atoms";

export default function Footer() {
    return (
        <S.Footer>
            <S.SocialIcons>
                <BsFacebook size={32} />
                <BsInstagram size={32} />
                <BsTwitter size={32} />
            </S.SocialIcons>
            <S.Credits>Desenvolvido por Alisson</S.Credits>
        </S.Footer>
    );
};