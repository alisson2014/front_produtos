import React, { ReactElement, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Field from "../Field";
import { Form } from "./styles";

interface IResponseApi {
    status: boolean | undefined
    message: string
}

interface IFormProps {
    show: boolean
    id?: number
    handleClose: () => void
}

export default function FormCategorie({ show, id, handleClose }: IFormProps) {
    const [nomeCategoria, setNomeCategoria] = useState<string>("");
    const [responseApi, setResponseApi] = useState<IResponseApi>({
        status: undefined,
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
                })
            })
            .catch((error) => console.error(error))
            .finally(() => alert(responseApi.message));
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
                        fieldValue={id}
                        readonly
                    />
                    <Field
                        onChange={(e) => (
                            setNomeCategoria(e.target.value)
                        )}
                        fieldLabel="Categoria"
                        fieldId="categoria"
                        fieldValue={nomeCategoria}
                        fieldHolder="Digite o nome da categoria"
                        minLength={3}
                        maxLength={50}
                        fieldType="text"
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
