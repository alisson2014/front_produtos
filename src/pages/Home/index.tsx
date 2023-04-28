import { useState, useEffect } from "react"
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Row from "../../components/Row";

export default function Home() {
    const [data, setData] = useState([]);

    const requester = async () => {
        await fetch("http://localhost/produtosLike/index.php")
            .then((response) => response.json())
            .then((data) => setData(data["categorias"]))
            .catch((e) => console.log(e))
            .finally(() => console.log("Fim da requisição."))
    }

    useEffect(() => {
        requester();
    }, []);

    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Categorias</h1>
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
                        <th style={{ textAlign: "center" }}>Editar</th>
                        <th style={{ textAlign: "center" }}>Deletar</th>
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
                <Button variant="info" size="lg">Nova categoria</Button>
            </center>
        </Container>
    );
};
