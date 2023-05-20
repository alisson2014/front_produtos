import Footer from "../Footer";
import Header from "../Header";
import { Container } from "./styles";

export default function Layout({ children }: any) {
    return (
        <Container>
            <Header />
            {children}
            <Footer />
        </Container>
    );
};