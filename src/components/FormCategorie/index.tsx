import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Field from "../Field";
import { Form } from "./styles";
import { register } from "../../service";

interface IResponseApi {
    status: boolean | undefined
    message: string
}

interface Iprops {
    id: number | undefined
    nome: string
}

interface IFormProps {
    show: boolean
    props: Iprops
    handleClose: () => void
    setProps: ({
        id,
        nome
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

        register("categories", props)
            .then((response) => setResponseApi({
                status: response.status,
                message: response.message
            }));
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
                        fieldValue={props.nome}
                        onChange={(e) => (
                            setProps({
                                id: props.id,
                                nome: e.target.value
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
                            nome: ""
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
