import { useState, useEffect } from "react"
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

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
                        <th style={{ textAlign: "center" }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map((categorie) => (
                        <tr key={categorie["id"]}>
                            <td>{categorie["id"]}</td>
                            <td>{categorie["nomeCategoria"]}</td>
                            <td
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "16px"
                                }}
                            >
                                <Button variant="primary">Editar</Button>
                                <Button variant="danger">Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <center>
                <Button variant="info" size="lg">Nova categoria</Button>
            </center>
        </Container>
    );
};
