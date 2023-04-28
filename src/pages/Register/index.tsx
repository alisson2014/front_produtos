import { useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../../components/Field";
import { Form } from "./styles";

export default function Register() {
    const [categoria, setCategoria] = useState({
        id: "45",
        nomeCategoria: "",
    });

    const controllerInput = (event: any) => {
        console.log(event.target.value);
        setCategoria({
            id: "45",
            nomeCategoria: event.target.value
        });
    }

    const onRegister = async (event: any) => {
        if (event.type === "submit") {
            event.preventDefault();
            console.log(categoria);
        }
    }

    return (
        <center>
            <h2>Registrar</h2>
            <Form onSubmit={onRegister}>
                <Field
                    fieldLabel="ID"
                    fieldId="id"
                    fieldValue={categoria.id}
                    readonly
                />
                <Field
                    onChange={controllerInput}
                    fieldLabel="Categoria"
                    fieldId="categoria"
                    fieldValue={categoria.nomeCategoria}
                    required
                />
                <Button
                    type="submit"
                    variant="success"
                    size="lg"
                >
                    Salvar
                </Button>
            </Form>
        </center>
    );
};
