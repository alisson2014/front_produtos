import SidebarItem from "components/SidebarItem";
import { Container, Content } from "./atoms";
import {
    FaTimes,
    FaHome,
    FaBoxes,
    FaRegSun,
    FaUserAlt,
    FaRegFileAlt,
    FaChartBar
} from "react-icons/fa";
import { Active } from "interface";

export default function Sidebar({ active, setActive }: Active) {
    const closeSidebar = () => setActive(false);

    return (
        <Container sidebar={active}>
            <FaTimes onClick={closeSidebar} />
            <Content>
                <SidebarItem
                    Icon={FaHome}
                    text="Categorias"
                    route="categorias"
                    onClick={closeSidebar}
                />
                <SidebarItem
                    Icon={FaBoxes}
                    text="Produtos"
                    route="produtos"
                    onClick={closeSidebar}
                />
                <SidebarItem
                    Icon={FaUserAlt}
                    text="Clientes"
                />
                <SidebarItem
                    Icon={FaRegFileAlt}
                    text="Orçamentos"
                />
                <SidebarItem
                    Icon={FaRegSun}
                    text="Configurações"
                />
            </Content>
        </Container>
    );
};