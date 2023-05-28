import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getData, save, useLocalStorage } from "service";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import { TextError } from "./styles";
import { ICategories, FormCategories, localCategories } from "interface";

export default function Categories({ show, props, handleClose }: FormCategories) {
    const { id, nome } = props;
    const [categories, setCategories] = useLocalStorage<localCategories>("categories", null);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm<ICategories>();

    useEffect(() => {
        setValue("id", id);
        setValue("nome", nome);
    }, [props, setValue]);

    useEffect(() => {
        if (categories === null || categories?.length === 0) {
            getData<ICategories>("categories").then((res) => {
                setCategories(res);
            });
        }
    }, [categories, setCategories]);

    const onSubmit = (data: ICategories) => {
        save("categories", data)
            .then((res) => {
                if (res?.status) {
                    Swal.fire(
                        "Sucesso!",
                        res?.message,
                        "success"
                    ).then((res) => {
                        if (res.isConfirmed) {
                            setCategories(null);
                            window.location.reload();
                        };
                    });
                } else {
                    Swal.fire(
                        "Erro!",
                        res?.message,
                        "error"
                    ).then(
                        (res) => res.isConfirmed && window.location.reload()
                    );
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
                            defaultValue={id}
                            {...register("id")}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="categorie">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            defaultValue={nome}
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
