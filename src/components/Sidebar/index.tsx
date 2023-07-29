import SidebarItem from "components/SidebarItem";
import { Container, Content } from "./atoms";
import {
    FaTimes,
    FaHome,
    FaEnvelope,
    FaRegSun,
    FaUserAlt,
    FaIdCardAlt,
    FaRegFileAlt,
    FaRegCalendarAlt,
    FaChartBar
} from "react-icons/fa";
import { Active } from "interface";

export default function Sidebar({ active, setActive }: Active) {
    const closeSidebar = () => setActive(false);

    return (
        <Container sidebar={active}>
            <FaTimes onClick={closeSidebar} />
            <Content>
                <SidebarItem Icon={FaHome} text="Categorias" route="categorias" />
                <SidebarItem Icon={FaChartBar} text="Produtos" route="produtos" />
                <SidebarItem Icon={FaUserAlt} text="Users" />
                <SidebarItem Icon={FaEnvelope} text="Mail" />
                <SidebarItem Icon={FaRegCalendarAlt} text="Calendar" />
                <SidebarItem Icon={FaIdCardAlt} text="Employees" />
                <SidebarItem Icon={FaRegFileAlt} text="Reports" />
                <SidebarItem Icon={FaRegSun} text="Settings" />
            </Content>
        </Container>
    );
};