import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import { save } from "../../service";
import * as F from "./styles";

interface IResponseApi {
    status: boolean | undefined
    message: string
}

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
    const [responseApi, setResponseApi] = useState<IResponseApi>({
        status: undefined,
        message: ""
    });

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
            .then((response) => setResponseApi({
                status: response?.status,
                message: response?.message
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
            <F.Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                }}>
                    <F.Container>
                        <F.Label htmlFor="id">ID</F.Label>
                        <F.Input
                            id="id"
                            defaultValue={props?.id}
                            {...register("id")}
                            readOnly
                        />
                    </F.Container>
                    <F.Container>
                        <F.Label htmlFor="categorie">Categoria</F.Label>
                        <F.Input
                            id="categorie"
                            defaultValue={props?.nome}
                            placeholder="Digite o nome da categoria"
                            {...register("nome", { required: true, minLength: 3 })}
                            className={errors?.nome && "input-error"}
                        />
                        {errors?.nome?.type === "required" && (
                            <F.Error className="error-message">Categoria é obrigatório</F.Error>
                        )}
                        {errors?.nome?.type === "minLength" && (
                            <F.Error className="error-message">Digite 3 ou mais caracteres</F.Error>
                        )}
                    </F.Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleClose()}>
                        Cancelar
                    </Button>
                    <Button variant="success" type="submit">Salvar</Button>
                </Modal.Footer>
            </F.Form>
        </Modal>
    );
};
