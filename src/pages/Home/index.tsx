import { useState, useEffect } from "react"
import { Container, Button, Table } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Buttons, Title } from "./styles";
import FormCategorie from "../../components/FormCategorie";

interface Categories {
    id: number
    nomeCategoria: string
}

export default function Home() {
    const [data, setData] = useState<Categories[]>([]);
    const [idCategorie, setIdCategorie] = useState<number | undefined>(0);
    const [nameCategorie, setNameCategorie] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);

    async function getCategories(): Promise<void> {
        await fetch("http://localhost/produtosLike/")
            .then((response) => response.json())
            .then((data) => setData(data["categorias"]))
            .catch((error) => console.error(error))
            .finally(() => console.info("Fim da requisição."))
    };

    useEffect(() => {
        getCategories();
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
                    {Object.values(data).map((categorie) => {
                        const { id, nomeCategoria } = categorie
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{nomeCategoria}</td>
                                <Buttons>
                                    <Button variant="primary">
                                        <BiEdit size="20px" onClick={() => {
                                            setIdCategorie(id);
                                            setNameCategorie(nomeCategoria);
                                            setShow(true);
                                        }} />
                                    </Button>
                                    <Button variant="danger">
                                        <RiDeleteBin2Fill size="20px" onClick={() => console.log("Delete", id)} />
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
                    onClick={() => {
                        setIdCategorie(undefined);
                        setNameCategorie("");
                        setShow(true);
                    }}
                >
                    Nova categoria
                </Button>
            </center>
            <FormCategorie
                show={show}
                id={idCategorie}
                nomeCategoria={nameCategorie}
                setNomeCategoria={setNameCategorie}
                handleClose={handleClose}
            />
        </Container>
    );
};
