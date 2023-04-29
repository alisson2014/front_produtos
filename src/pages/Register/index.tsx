import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../../components/Field";
import { Form } from "./styles";

export default function Register() {
    const [nomeCategoria, setNomeCategoria] = useState<string>("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        await fetch("http://localhost/produtosLike/register.php", {
            method: "POST",
            headers: {
                "Content-Type": "applications/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ nomeCategoria })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
            .finally(() => console.log("Fim da requisição"));
    };

    return (
        <center>
            <h2>Registrar</h2>
            <Form onSubmit={handleSubmit} method="POST">
                <Field
                    fieldLabel="ID"
                    fieldId="id"
                    readonly
                />
                <Field
                    onChange={(e: any) => setNomeCategoria(e.target.value)}
                    fieldLabel="Categoria"
                    fieldId="categoria"
                    fieldValue={nomeCategoria}
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
