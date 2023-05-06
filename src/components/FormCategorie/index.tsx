import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Field from "../Field";
import { Form } from "./styles";

interface IResponseApi {
    status: boolean | undefined
    message: string
}

interface Iprops {
    id: number | undefined
    nomeCategoria: string
}

interface IFormProps {
    show: boolean
    props: Iprops
    handleClose: () => void
    setProps: ({
        id,
        nomeCategoria
    }: Iprops) => void
}

export default function FormCategorie({
    show,
    props,
    setProps,
    handleClose
}: IFormProps) {
    const [responseApi, setResponseApi] = useState<IResponseApi>({
        status: undefined,
        message: ""
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        let fetchApi = "http://localhost/produtosLike/register.php";

        if (props.id !== undefined) {
            fetchApi = "http://localhost/produtosLike/update.php";
        }

        await fetch(fetchApi, {
            method: "POST",
            headers: {
                "Content-Type": "applications/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(props)
        })
            .then((res) => res.json())
            .then((resJson) => {
                setResponseApi({
                    status: resJson.status,
                    message: resJson.message
                })
            })
            .catch((error) => console.error(error))
            .finally(() => {
                alert(responseApi.message);
                window.location.reload();
            });
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
                        fieldValue={props.id}
                        readonly
                    />
                    <Field
                        fieldLabel="Categoria"
                        fieldId="categoria"
                        fieldValue={props.nomeCategoria}
                        onChange={(e) => (
                            setProps({
                                id: props.id,
                                nomeCategoria: e.target.value
                            })
                        )}
                        fieldHolder="Digite o nome da categoria"
                        minLength={3}
                        maxLength={50}
                        fieldType="text"
                        required
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        setProps({
                            id: undefined,
                            nomeCategoria: ""
                        })
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
