import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Field from "../Field";
import { Form } from "./styles";

interface IResponseApi {
    status: boolean
    message: string
}

interface IFormProps {
    show: boolean
    handleClose: () => void
}

export default function FormCategorie({ show, handleClose }: IFormProps) {
    const [nomeCategoria, setNomeCategoria] = useState<string>("");
    const [responseApi, setResponseApi] = useState<IResponseApi>({
        status: true,
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
                setResponseApi(resJson);
            })
            .catch((error) => console.log(error))
            .finally(() => console.log(responseApi));
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar categoria</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit} method="POST">
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" type="submit">Salvar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
