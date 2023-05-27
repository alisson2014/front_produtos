import { useState, useEffect } from "react"
import { getData, deleteFn, useLocalStorage } from "service";
import { Button, Table } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Categories as Form } from "components/Forms";
import { Buttons, Title, Box } from "./styles";
import { ICategories, localCategories } from "interface";

export default function Home() {
    const [categories, setCategories] = useLocalStorage<localCategories>("categories", null);
    const [propsCategorie, setPropsCategorie] = useState<ICategories>({
        id: "",
        nome: ""
    });
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const editCategorie = (id: string, categorie: string) => {
        setPropsCategorie({
            id: id,
            nome: categorie
        });
        handleOpen();
    };

    const registerCategorie = () => {
        setPropsCategorie({
            id: "",
            nome: ""
        });
        handleOpen();
    };

    useEffect(() => {
        if (!categories) {
            getData("categories")
                .then((result) => {
                    setCategories(result);
                });
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
                                        <Button variant="primary" onClick={() => editCategorie(id, nome)}>
                                            <BiEdit size="20px" />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteFn(id, nome, "Categoria", "categories")}>
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
        </Box>
    );
};
