import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";

export function MFooter({ onClick }: any) {
    return (
        <ModalFooter>
            <Button variant="danger" type="button" onClick={onClick}>
                Cancelar
            </Button>
            <Button variant="success" type="submit">Salvar</Button>
        </ModalFooter>
    )
};