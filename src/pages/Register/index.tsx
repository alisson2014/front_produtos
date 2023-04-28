import { Button } from "react-bootstrap";
import Field from "../../components/Field";
import { Form } from "./styles";

export default function Register() {
    const id = 5;
    return (
        <center>
            <h2>Registrar</h2>
            <Form action="">
                <Field
                    fieldLabel="ID"
                    fieldId="id"
                    fieldValue="5"
                    readonly
                />
                <Field
                    fieldLabel="Categoria"
                    fieldId="categoria"
                    fieldValue="5"
                    required
                />
            </Form>
            <center>
                <Button variant="success" size="lg">
                    Salvar
                </Button>
            </center>
        </center>
    );
};
