import { ModalHeader, ModalTitle } from "react-bootstrap";

export default function MHeader({ title }: any) {
    return (
        <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
    )
}