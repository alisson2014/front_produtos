import { Item } from "./styles";
import { Link } from "react-router-dom";

interface ILinkTo {
    route: string
    routeName: string
}

export default function LinkTo({ route, routeName }: ILinkTo) {
    return (
        <Item>
            <Link to={route}>{routeName}</Link>
        </Item>
    );
};