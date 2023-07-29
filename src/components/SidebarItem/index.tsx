import { IconType } from 'react-icons';
import { Container, LinkTo } from './atoms';

interface SidebarItem {
    Icon: IconType;
    text: string;
    route?: string;
}

export default function SidebarItem({ Icon, text, route = "" }: SidebarItem) {
    return (
        <Container>
            <LinkTo to={route}>
                <Icon />
                {text}
            </LinkTo>
        </Container>
    );
};