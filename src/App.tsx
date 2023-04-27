import React, { useState, useEffect } from "react"
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./css/app.css";

export default function App() {
  const [data, setData] = useState([]);

  const requester = async () => {
    fetch("http://localhost/produtosLike/index.php")
      .then((response) => response.json())
      .then((data) => (
        setData(data["categorias"])
      ))
      .catch((e) => (
        console.log(e)
      ))
      .finally(() => (
        console.log("Fim da requisição.")
      ))
  }

  useEffect(() => {
    requester();
  }, []);

  return (
    <Container>
      <center>
        <h1>Categorias</h1>
      </center>
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
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((categorie) => (
            <tr key={categorie["id"]}>
              <td>{categorie["id"]}</td>
              <td>{categorie["nomeCategoria"]}</td>
              <td className="actions">
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
}
