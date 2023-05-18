import { useState, useEffect } from "react"
import { Container, Button, Table } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Buttons, Title } from "./styles";
import { getData, deleteData } from "../../service";
import FormCategorie from "../../components/FormCategorie";

interface Categories {
    id: string
    nome: string
}

export default function Home() {
    //Estado que guarda os dados da api
    const [data, setData] = useState<Categories[]>([]);

    //Estado que guarda o id e nome da categoria
    const [propsCategorie, setPropsCategorie] = useState<Categories>({
        id: "",
        nome: ""
    });

    //Estado do modal
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const editCategorie = (id: string, categorie: string) => {
        setPropsCategorie({
            id: id,
            nome: categorie
        });
        handleOpen();
    }

    const registerCategorie = () => {
        setPropsCategorie({
            id: "",
            nome: ""
        });
        handleOpen();
    }

    useEffect(() => {
        getData("categories")
            .then((result) => {
                setData(result);
            });
    }, []);

    return (
        <Container>
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
                                    <Button variant="primary">
                                        <BiEdit size="20px" onClick={() => editCategorie(id, nome)} />
                                    </Button>
                                    <Button variant="danger">
                                        <RiDeleteBin2Fill size="20px" onClick={() => {
                                            if (window.confirm("Deseja realmente exclui a categoria " + nome)) {
                                                deleteData("categories", id);
                                            }
                                        }} />
                                    </Button>
                                </Buttons>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <center>
                <Button
                    variant="info"
                    size="lg"
                    onClick={registerCategorie}
                >
                    Nova categoria
                </Button>
            </center>
            <FormCategorie
                show={show}
                props={propsCategorie}
                handleClose={handleClose}
            />
        </Container>
    );
};
