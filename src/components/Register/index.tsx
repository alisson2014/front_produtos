import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

export default function Register() {
    const { id } = useParams();

    return (
        <Form style={{ marginTop: 100 }}>
            <Form.Group controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                    defaultValue={id}
                    readOnly
                />
            </Form.Group>
            <Form.Group controlId="categorie">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                    defaultValue="Oi"
                    placeholder="Digite o nome da categoria"
                />
            </Form.Group>
        </Form>
    );
};