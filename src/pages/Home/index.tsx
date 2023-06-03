import { useState, useEffect } from "react"
import { useLocalStorage, httpRequester } from "service";
import { deleteFn, getCategories } from "controller";
import { Button, Table } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Categories as Form } from "components/Forms";
import { Buttons, Title, Box } from "./styles";
import { ICategories, localCategories } from "interface";

export default function Home() {
    const initialState: ICategories = {
        id: "",
        nome: ""
    };

    const [categories, setCategories, clearStorage] = useLocalStorage<localCategories>("categories", []);
    const [propsCategorie, setPropsCategorie] = useState<ICategories>(initialState);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => {
        setPropsCategorie(initialState);
        setShow(false)
    };
    const handleOpen = () => setShow(true);

    const editCategorie = (props: ICategories): void => {
        setPropsCategorie(props);
        handleOpen();
    };

    const registerCategorie = (): void => {
        setPropsCategorie(initialState);
        handleOpen();
    };

    useEffect(() => {
        if (categories.length === 0) {
            httpRequester(getCategories)
                .then((result) => setCategories(result));
        }
    }, [categories, setCategories]);

    return (
        <Box>
            <Title>Categorias</Title>
            <Table
                striped
                bordered
                hover
                variant="dark"
                responsive
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Categoria</th>
                        <th style={{
                            textAlign: "center",
                            width: "256px",
                        }}>
                            Editar/Deletar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length !== 0 ? (
                        categories.map((categorie) => {
                            const { id, nome } = categorie;
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{nome}</td>
                                    <Buttons>
                                        <Button
                                            title={`Editar ${nome}`}
                                            variant="primary"
                                            onClick={() => editCategorie(categorie)}
                                        >
                                            <BiEdit size={20} />
                                        </Button>
                                        <Button
                                            title={`Excluir ${nome}`}
                                            variant="danger"
                                            onClick={() => {
                                                deleteFn({
                                                    id: id,
                                                    deleted: nome,
                                                    typeData: "Categoria",
                                                    file: "categories"
                                                }, clearStorage);
                                            }}
                                        >
                                            <RiDeleteBin2Fill size={20} />
                                        </Button>
                                    </Buttons>
                                </tr>
                            );
                        })
                    ) : <p>Carregando dados...</p>}
                </tbody>
            </Table>
            <Button
                title="Cadastrar"
                variant="info"
                size="lg"
                onClick={registerCategorie}
                style={{ alignSelf: "center" }}
            >
                Nova categoria
            </Button>
            <Form
                show={show}
                props={propsCategorie}
                handleClose={handleClose}
            />
        </Box >
    );
};
