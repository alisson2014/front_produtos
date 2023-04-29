import { useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../../components/Field";
import { Form } from "./styles";

export default function Register() {
    const [categoria, setCategoria] = useState({
        nomeCategoria: "",
    });

    const controllerInput = (event: any) => {
        setCategoria({
            nomeCategoria: event.target.value
        });
    };

    const onRegister = async (event: any) => {
        if (event.type === "submit") {
            event.preventDefault();
            console.log(categoria);
            await fetch("http://localhost/produtosLike/register.php", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(categoria)
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.log(error))
                .finally(() => console.log("Fim da requisição"));
        }
    };

    return (
        <center>
            <h2>Registrar</h2>
            <Form onSubmit={onRegister} method="POST">
                <Field
                    fieldLabel="ID"
                    fieldId="id"
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
