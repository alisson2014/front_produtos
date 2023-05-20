import {
    BsFacebook,
    BsInstagram,
    BsTwitter
} from "react-icons/bs";
import * as F from "./styles";

export default function Footer() {
    return (
        <F.Footer>
            <F.SocialIcons>
                <BsFacebook size={32} />
                <BsInstagram size={32} />
                <BsTwitter size={32} />
            </F.SocialIcons>
            <F.Credits>Desenvolvido por Alisson</F.Credits>
        </F.Footer>
    );
};