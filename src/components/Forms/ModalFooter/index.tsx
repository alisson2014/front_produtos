import { AiOutlineClear } from "react-icons/ai";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";

export default function MFooter({ onClick }: any) {
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
    )
};