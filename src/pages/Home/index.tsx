import { useState, useEffect } from "react"
import { Button, Table } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Buttons, Title, Box } from "./styles";
import { getData, deleteFn } from "../../service";
import FormCategorie from "../../components/FormCategorie";

interface Categories {
    id: string
    nome: string
}

export default function Home() {
    const [data, setData] = useState<Categories[]>([]);
    const [propsCategorie, setPropsCategorie] = useState<Categories>({
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
        getData("categories")
            .then((result) => {
                setData(result);
            });
    }, []);

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
                    {data.map((categorie) => {
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
                    })}
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
            <FormCategorie
                show={show}
                props={propsCategorie}
                handleClose={handleClose}
            />
        </Box>
    );
};
