import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";

export function MFooter({ onClick }: any) {
    return (
        <ModalFooter>
            <Button
                title="Cancelar"
                variant="danger"
                type="button"
                onClick={onClick}
            >
                Cancelar
            </Button>
            <Button variant="success" type="submit" title="Salvar">Salvar</Button>
        </ModalFooter>
    )
};