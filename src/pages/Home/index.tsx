import { useState, useEffect } from "react"
import { getData, deleteFn, useLocalStorage } from "service";
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

    const [categories, setCategories] = useLocalStorage<localCategories>("categories", null);
    const [propsCategorie, setPropsCategorie] = useState<ICategories>(initialState);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
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
        if (categories === null || categories?.length === 0) {
            getData<ICategories>("categories")
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
                    {categories !== null ? (
                        categories.map((categorie) => {
                            const { id, nome } = categorie;
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{nome}</td>
                                    <Buttons>
                                        <Button variant="primary" onClick={() => editCategorie(categorie)}>
                                            <BiEdit size="20px" />
                                        </Button>
                                        <Button variant="danger" onClick={() => {
                                            deleteFn({
                                                id: id,
                                                deleted: nome,
                                                typeData: "Categoria",
                                                file: "categories"
                                            }, setCategories);
                                        }}>
                                            <RiDeleteBin2Fill size="20px" />
                                        </Button>
                                    </Buttons>
                                </tr>
                            );
                        })
                    ) : <p>Carregando dados...</p>}
                </tbody>
            </Table>
            <Button
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
