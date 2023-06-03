import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { errorHandler, useLocalStorage, httpRequester } from "service";
import { saveFn, getCategories } from "controller";
import { Modal, Form } from "react-bootstrap";
import { MBody, TextError } from "./styles";
import { ICategories, FormCategories, localCategories, method } from "interface";
import MFooter from "./ModalFooter";
import MHeader from "./ModalHeader";
import { optionsInputCategorie } from "./optionsHanlder";

export default function Categories({ show, props, handleClose }: FormCategories) {
    const { id, nome } = props;
    const [categories, setCategories, clearStorage] = useLocalStorage<localCategories>("categories", []);

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
        if (categories.length === 0) {
            httpRequester(getCategories).then((res) => {
                setCategories(res);
            });
        }
    }, [categories, setCategories]);

    const onSubmit = (data: ICategories) => {
        let method: method = "POST";
        if (data.id !== "") method = "UPDATE";
        saveFn("categories", data, clearStorage, method);
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <MHeader title="Cadastrar categoria" />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <MBody>
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
                            {...register("nome", optionsInputCategorie)}
                        />
                        {errors?.nome && (
                            <TextError>
                                {errorHandler(errors?.nome?.type, { field: "Categoria", minLength: 3, maxLength: 50 })}
                            </TextError>
                        )}
                    </Form.Group>
                </MBody>
                <MFooter onClick={handleClose} />
            </Form>
        </Modal>
    );
};
