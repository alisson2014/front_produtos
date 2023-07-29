import { IconType } from 'react-icons';
import { Container, LinkTo } from './atoms';

interface SidebarItem {
    Icon: IconType;
    text: string;
    route?: string;
    onClick?: () => void;
}

export default function SidebarItem({
    Icon,
    text,
    route = "",
    onClick
}: SidebarItem) {
    return (
        <Container>
            <LinkTo to={route} onClick={onClick}>
                <Icon />
                {text}
            </LinkTo>
        </Container>
    );
};