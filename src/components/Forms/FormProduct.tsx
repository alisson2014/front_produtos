import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorHandler, httpRequester } from "service";
import { getCategories, getProducts, saveFn } from "controller";
import { ICategories, IProducts, id } from "interface";
import Button from "react-bootstrap/Button";
import { AiOutlineClear } from "react-icons/ai";
import * as S from "./atoms";
import { SubTitle } from "styles/basics";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function FormProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formProps, setFormProps] = useState<IProducts>({
        id: "",
        nomeProduto: "",
        categoria: "",
        idCategoria: "",
        valor: 0
    });
    const [categorias, setCategorias] = useState<ICategories[]>([]);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm<IProducts>();

    useEffect(() => {
        setValue("id", formProps.id);
        setValue("nomeProduto", formProps.nomeProduto);
        setValue("idCategoria", formProps.idCategoria);
        setValue("valor", formProps.valor);
    }, [formProps, setValue]);

    useEffect(() => {
        if (categorias.length === 0) {
            httpRequester({ ...getCategories })
                .then((res) => setCategorias(res));
        }

        if (id !== undefined && id !== "cadastrar") {
            const idNumber = parseInt(id);
            httpRequester({ ...getProducts, id: idNumber })
                .then((res) => setFormProps(res));
        }
    }, []);

    const onSubmit = (data: IProducts) => {
        saveFn("produtos", data);
        navigate("/produtos/cadastrar");
    };

    return (
        <S.Forms onSubmit={handleSubmit(onSubmit)}>
            <SubTitle>Cadastro de produtos</SubTitle>
            <Container>
                <Row>
                    <S.Group as={Col} sm={2}>
                        <S.Label htmlFor="id">ID</S.Label>
                        <S.Input
                            id="id"
                            defaultValue={formProps.id}
                            {...register("id")}
                            readOnly
                        />
                    </S.Group>
                    <S.Group as={Col} sm={10}>
                        <S.Label htmlFor="nomeProduto">Nome do produto</S.Label>
                        <S.Input
                            id="nomeProduto"
                            defaultValue={formProps.nomeProduto}
                            placeholder="Digite o nome do produto"
                            {...register("nomeProduto", {
                                required: true,
                                minLength: 3,
                                maxLength: 50
                            })}
                        />
                    </S.Group>
                </Row>
                <Row>
                    <S.Group as={Col} sm={8}>
                        <S.Label htmlFor="categoria">Selecione a categoria</S.Label>
                        <S.Select
                            id="categoria"
                            className={errors?.categoria && "error"}
                            defaultValue={formProps.idCategoria}
                            {...register("idCategoria", { required: true })}
                        >
                            <option value="" disabled>Selecione...</option>
                            {categorias.length > 0 && categorias.map((categoria) => {
                                const { id, nomeCategoria } = categoria;
                                return <option key={id} value={id}>{nomeCategoria}</option>;
                            })}
                        </S.Select>
                        {errors?.categoria && (
                            <S.Feedback>
                                {errorHandler(errors?.categoria?.type, { field: "Categoria" })}
                            </S.Feedback>
                        )}
                    </S.Group>
                    <S.Group as={Col} sm={4}>
                        <S.Label htmlFor="valor">Valor do produto</S.Label>
                        <S.Input
                            id="valor"
                            type="number"
                            defaultValue={formProps.valor}
                            placeholder="Digite o valor do produto"
                            {...register("valor", {
                                required: true,
                                min: 1,
                                max: 1000000
                            })}
                        />
                    </S.Group>
                </Row>
                <S.Footer>
                    <Button variant="warning" type="reset" title="Limpar">
                        <AiOutlineClear />
                    </Button>
                    <Button variant="success" type="submit" title="Salvar">Salvar</Button>
                </S.Footer>
            </Container>
        </S.Forms>
    );

};