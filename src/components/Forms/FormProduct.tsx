import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorHandler, httpRequester } from "service";
import { getCategories, getProducts, saveFn } from "controller";
import { ICategories, IProducts, id } from "interface";
import Button from "react-bootstrap/Button";
import { AiOutlineClear } from "react-icons/ai";
import * as S from "./atoms";
import { Title } from "styles/basics";
import { Spinner } from "react-bootstrap";

export default function FormProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formProps, setFormProps] = useState<IProducts>({
        id: "",
        nomeProduto: "",
        categoria: "",
        valor: 0
    });
    const [categorias, setCategorias] = useState<ICategories[]>([]);
    const [selectDefault, setSelectDefault] = useState<id>("");

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm<IProducts>();

    useEffect(() => {
        setValue("id", formProps.id);
        setValue("nomeProduto", formProps.nomeProduto);
        setValue("categoria", selectDefault);
        setValue("valor", formProps.valor);
    }, [formProps, selectDefault, setValue]);

    useEffect(() => {
        if (categorias.length === 0) {
            httpRequester({ ...getCategories })
                .then((res) => setCategorias(res));
        }

        if (id === "cadastrar") {
            setFormProps({
                id: "",
                nomeProduto: "",
                categoria: "",
                valor: 0
            });
        }

        if (id !== undefined && id !== "cadastrar") {
            const idNumber = parseInt(id);
            httpRequester({ ...getProducts, id: idNumber })
                .then((res) => setFormProps(res));
        }

        console.log(selectDefault);
    }, []);

    useEffect(() => {
        if (categorias.length > 0) {
            const find = categorias.find((categoria) => categoria.nomeCategoria === formProps.categoria);
            if (find) {
                setSelectDefault(find.id);
            }
        }
    }, [categorias]);

    const onSubmit = (data: IProducts) => {
        saveFn("produtos", data);
        navigate("/produtos/cadastrar");
    };

    return (
        <S.Forms onSubmit={handleSubmit(onSubmit)}>
            <Title>Cadastro de produtos</Title>
            <S.Group controlId="id">
                <S.Label>ID</S.Label>
                <S.Input
                    defaultValue={formProps.id}
                    {...register("id")}
                    readOnly
                />
            </S.Group>
            <S.Group controlId="nomeProduto">
                <S.Label>Nome do produto</S.Label>
                <S.Input
                    defaultValue={formProps.nomeProduto}
                    placeholder="Digite o nome do produto"
                    {...register("nomeProduto", {
                        required: true,
                        minLength: 3,
                        maxLength: 50
                    })}
                />
            </S.Group>
            <S.Group controlId="categoria">
                <S.Label>Selecione a categoria</S.Label>
                {selectDefault !== "" && (
                    <S.Select
                        className={errors?.categoria && "error"}
                        defaultValue={formProps.categoria}
                        {...register("categoria", { required: true })}
                    >
                        <option value="" disabled>Selecione...</option>
                        {categorias.length > 0 && categorias.map((categoria) => {
                            const { id, nomeCategoria } = categoria;
                            return <option key={id} value={id}>{nomeCategoria}</option>;
                        })}
                    </S.Select>
                )}
                {errors?.categoria && (
                    <S.Feedback>
                        {errorHandler(errors?.categoria?.type, { field: "Categoria" })}
                    </S.Feedback>
                )}
            </S.Group>
            <S.Group controlId="valor">
                <S.Label>Valor do produto</S.Label>
                <S.Input
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="warning" type="reset" title="Limpar">
                    <AiOutlineClear />
                </Button>
                <Button variant="success" type="submit" title="Salvar">Salvar</Button>
            </div>
        </S.Forms>
    );

};