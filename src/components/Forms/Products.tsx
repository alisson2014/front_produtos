import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    errorHandler,
    httpRequester,
    saveFn,
    useLocalStorage
} from "service";
import { Modal, Col, Form } from "react-bootstrap";
import { TextError } from "./styles";
import {
    IProducts,
    FormProducts,
    localCategories,
    id,
    localProducts,
    method
} from "interface";
import { optionsInputProducts } from "./optionsHanlder";
import MHeader from "./ModalHeader";
import MFooter from "./ModalFooter";

export default function Products({ show, props, handleClose }: FormProducts) {
    const { id, nome, nomeCategoria, valor } = props;

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm<IProducts>();

    const [categories, setCategories] = useLocalStorage<localCategories>("categories", []);
    const [products, setProducts, clearLocalStorage] = useLocalStorage<localProducts>("products", []);

    const [dataPost, setDataPost] = useState<any>({});
    const [idCategorie, setIdCategorie] = useState<id>("");

    const onSubmit = (data: IProducts): void => {
        if (categories.length !== 0) {
            categories.find((categorie) => {
                if (categorie.nome === data.nomeCategoria) setIdCategorie(categorie.id);
            });
            setDataPost(data);
        }
    };

    useEffect(() => {
        setValue("id", id);
        setValue("nome", nome);
        setValue("nomeCategoria", nomeCategoria);
        setValue("valor", valor);
    }, [id, nome, nomeCategoria, valor, setValue]);

    useEffect(() => {
        if (categories.length === 0) {
            httpRequester({ method: "GET", file: "categories" })
                .then((result) => setCategories(result));
        }
    }, [categories, setCategories]);

    useEffect(() => {
        if (products.length === 0) {
            httpRequester({ method: "GET", file: "products" })
                .then((result) => setProducts(result));
        }
    }, [products, setProducts]);

    useEffect(() => {
        if (idCategorie !== "") {
            const data = { ...dataPost, idCategoria: idCategorie };
            let method: method = "POST";
            if (dataPost.id !== "") method = "UPDATE";
            saveFn("products", data, clearLocalStorage, method);
        }
    }, [idCategorie]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <MHeader title="Cadastrar produto" />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body style={{
                    display: "flex",
                    gap: "16px"
                }}>
                    <Col>
                        <Form.Group controlId="id">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                defaultValue={id}
                                {...register("id")}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlId="product">
                            <Form.Label>Produto</Form.Label>
                            <Form.Control
                                defaultValue={nome}
                                placeholder="Digite o nome do produto"
                                {...register("nome", optionsInputProducts)}
                            />
                            {errors?.nome && (
                                <TextError>{errorHandler(errors.nome.type, { field: "Produto", minLength: 3, maxLength: 5 })}</TextError>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="categorie">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                style={{ cursor: "pointer" }}
                                placeholder="Digite o nome da categoria"
                                defaultValue={nomeCategoria}
                                {...register("nomeCategoria", { required: true })}
                            >
                                <option defaultValue="" disabled></option>
                                {categories.length !== 0 ? (
                                    categories.map((categorie) => {
                                        return (
                                            <option
                                                key={categorie?.id}
                                                value={categorie?.nome}
                                            >
                                                {categorie?.nome}
                                            </option>
                                        );
                                    })
                                ) : <p>Carregando dados...</p>}
                            </Form.Select>
                            {errors?.nomeCategoria?.type === "required" && (
                                <TextError>Categoria é obrigatório</TextError>
                            )}
                        </Form.Group>
                        <Form.Group controlId="value">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                defaultValue={valor}
                                placeholder="Digite o valor do produto"
                                type="number"
                                step="0.1"
                                {...register("valor", { required: true })}
                            />
                            {errors?.valor?.type === "required" && (
                                <TextError>Valor é obrigatório</TextError>
                            )}
                        </Form.Group>
                    </Col>
                </Modal.Body>
                <MFooter onClick={() => handleClose()} />
            </Form>
        </Modal>
    );
};
