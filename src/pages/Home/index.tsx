import { useState, useEffect } from "react"
import { Container, Button, Table } from "react-bootstrap";
import Row from "../../components/Row";
import FormCategorie from "../../components/FormCategorie";
import { Title } from "./styles";

export default function Home() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    async function requester(): Promise<void> {
        await fetch("http://localhost/produtosLike/index.php")
            .then((res) => res.json())
            .then((data) => setData(data["categorias"]))
            .catch((error) => console.log(error))
            .finally(() => console.log("Fim da requisição."))
    };

    useEffect(() => {
        requester();
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
                        const id = categorie["id"];
                        const name = categorie["nomeCategoria"];
                        const atributes = [id, name];
                        return (
                            <Row
                                key={id}
                                col={atributes}
                            />
                        );
                    })}
                </tbody>
            </Table>
            <center>
                <Button
                    variant="info"
                    size="lg"
                    onClick={() => setShow(true)}
                >
                    Nova categoria
                </Button>
            </center>
            <FormCategorie
                show={show}
                handleClose={handleClose}
            />
        </Container>
    );
};
