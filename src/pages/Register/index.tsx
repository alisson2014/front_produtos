import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../../components/Field";
import { Form } from "./styles";

interface IResponseApi {
    status: boolean
    message: string
}

export default function Register() {
    const [nomeCategoria, setNomeCategoria] = useState<string>("");
    const [responseApi, setResponseApi] = useState<IResponseApi>({
        status: false,
        message: ""
    });

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
            .then((resJson) => {
                setResponseApi({
                    status: resJson.status,
                    message: resJson.message
                });
            })
            .catch((error) => console.log(error))
            .finally(() => (
                alert(responseApi.message)
            ));
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
