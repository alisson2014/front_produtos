import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    errorHandler,
    httpRequester,
    getCategories,
    saveFn
} from "service";
import { ICategories } from "interface";
import Button from "react-bootstrap/Button";
import { AiOutlineClear } from "react-icons/ai";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import * as S from "./atoms";
import { SubTitle } from "styles/basics";

export default function FormCategorie() {
    const { id } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [formProps, setFormProps] = useState<ICategories>({
        id: "",
        nomeCategoria: ""
    });

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm<ICategories>();

    useEffect(() => {
        setValue("id", formProps.id);
        setValue("nomeCategoria", formProps.nomeCategoria);
    }, [formProps, setValue]);

    useEffect(() => {
        if (id === "cadastrar") {
            setFormProps({
                id: "",
                nomeCategoria: ""
            });
        }

        if (id !== undefined && id !== "cadastrar") {
            const idNumber = parseInt(id);
            httpRequester({ ...getCategories, id: idNumber })
                .then((res) => setFormProps(res));
        }
    }, []);

    const onSubmit = (data: ICategories) => {
        saveFn("categorias", data);
        navigate("/categorias/cadastrar");
    };

    return (
        <>
            <S.BackButton
                variant="dark"
                type="button"
                onClick={() => window.history.back()}
            >
                <IoArrowBackCircleSharp size={42} color="#7aa203" />
            </S.BackButton>
            <S.Forms onSubmit={handleSubmit(onSubmit)}>
                <SubTitle>Cadastro de categorias</SubTitle>
                <S.Group controlId="id">
                    <S.Label>ID</S.Label>
                    <S.Input
                        defaultValue={formProps.id}
                        {...register("id")}
                        readOnly
                    />
                </S.Group>
                <S.Group controlId="categorie">
                    <S.Label>Categoria</S.Label>
                    <S.Input
                        className={errors?.nomeCategoria && "error"}
                        defaultValue={formProps.nomeCategoria}
                        {...register("nomeCategoria", {
                            required: true,
                            minLength: 3,
                            maxLength: 50,
                        })}
                        placeholder="Digite o nome da categoria"
                    />
                    {errors?.nomeCategoria && (
                        <S.Feedback>
                            {errorHandler(errors?.nomeCategoria?.type, { field: "Categoria", minLength: 3, maxLength: 50 })}
                        </S.Feedback>
                    )}
                </S.Group>
                <S.Footer>
                    <Button variant="warning" type="reset" title="Limpar">
                        <AiOutlineClear />
                    </Button>
                    <Button variant="success" type="submit" title="Salvar">Salvar</Button>
                </S.Footer>
            </S.Forms>
        </>
    );
};