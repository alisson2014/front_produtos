import { Link } from "react-router-dom";
import { Item } from "./styles";
import { ILinkTo } from "interface";

export default function LinkTo({ route, routeName }: ILinkTo) {
    return (
        <Item>
            <Link to={route}>{routeName}</Link>
        </Item>
    );
};