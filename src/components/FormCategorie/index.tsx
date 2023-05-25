import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import { save } from "../../service";
import { TextError } from "./styles";

interface Iprops {
    id: string
    nome: string
}

interface IFormProps {
    show: boolean
    props: Iprops
    handleClose: () => void
}

export default function FormCategorie({
    show,
    props,
    handleClose
}: IFormProps) {
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm<Iprops>();

    useEffect(() => {
        setValue("id", props?.id);
        setValue("nome", props?.nome);
    }, [props, setValue]);

    const onSubmit = (data: Iprops) => {
        save("categories", data)
            .then((res) => {
                if (res?.status) {
                    Swal.fire(
                        "Sucesso!",
                        res?.message,
                        "success"
                    ).then((res) => {
                        if (res.isConfirmed) window.location.reload();
                    });
                } else {
                    Swal.fire(
                        "Erro!",
                        res?.message,
                        "error"
                    ).then((res) => {
                        if (res.isConfirmed) window.location.reload();
                    });
                }
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                }}>
                    <Form.Group controlId="id">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            defaultValue={props?.id}
                            {...register("id")}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="categorie">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            defaultValue={props?.nome}
                            placeholder="Digite o nome da categoria"
                            {...register("nome", { required: true, minLength: 3, maxLength: 50 })}
                        />
                        {errors?.nome?.type === "required" && (
                            <TextError>Categoria é obrigatório</TextError>
                        )}
                        {errors?.nome?.type === "minLength" && (
                            <TextError>Digite 3 ou mais caracteres</TextError>
                        )}
                        {errors?.nome?.type === "maxLength" && (
                            <TextError>Digite no maximo 50 caracteres</TextError>
                        )}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="button" onClick={() => handleClose()}>
                        Cancelar
                    </Button>
                    <Button variant="success" type="submit">Salvar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
