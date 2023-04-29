import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Field from "../Field";
import { Form } from "./styles";

interface IResponseApi {
    type: string
    message: string
}

interface IFormProps {
    show: boolean
    handleClose: () => void
}

export default function FormCategorie({ show, handleClose }: IFormProps) {
    const [nomeCategoria, setNomeCategoria] = useState<string>("");
    const [responseApi, setResponseApi] = useState<IResponseApi>({
        type: "",
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
                if (resJson.status) {
                    setResponseApi({
                        type: "success",
                        message: "Categoria cadastrada com sucesso."
                    });
                } else {
                    setResponseApi({
                        type: "error",
                        message: "Erro ao cadastrar categoria."
                    });
                }
            })
            .catch((error) => console.error(error))
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
                <Modal.Body style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                }}>
                    <Field
                        fieldLabel="ID"
                        fieldId="id"
                        readonly
                    />
                    <Field
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
                            setNomeCategoria(e.target.value)
                        )}
                        fieldLabel="Categoria"
                        fieldId="categoria"
                        fieldValue={nomeCategoria}
                        fieldHolder="Digite o nome da categoria"
                        minLength={3}
                        maxLength={50}
                        required
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        setNomeCategoria("");
                        handleClose();
                    }}>
                        Cancelar
                    </Button>
                    <Button variant="success" type="submit">Salvar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
