import { useState } from "react";
import { Container } from "./atoms";
import { FaBars } from "react-icons/fa";
import Sidebar from "components/Sidebar";

export default function Header() {
    const [sidebar, setSidebar] = useState<boolean>(false);
    const showSiderbar = () => setSidebar(!sidebar);

    return (
        <Container>
            <FaBars onClick={showSiderbar} />
            {sidebar && <Sidebar active={sidebar} setActive={setSidebar} />}
        </Container>
    );
};