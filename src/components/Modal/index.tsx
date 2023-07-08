import styled from "styled-components";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import { AiOutlineClear } from "react-icons/ai";

export const Header = ({ title }: { title: string }) => {
    return (
        <ModalHeader closeButton>
            <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
    );
};

export const Body = styled(ModalBody)`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Footer = ({ onClick }: any) => {
    return (
        <ModalFooter>
            <Button variant="warning" type="reset" title="Limpar">
                <AiOutlineClear />
            </Button>
            <Button
                title="Cancelar"
                variant="danger"
                type="button"
                onClick={() => onClick()}
            >
                Cancelar
            </Button>
            <Button variant="success" type="submit" title="Salvar">Salvar</Button>
        </ModalFooter>
    );
};