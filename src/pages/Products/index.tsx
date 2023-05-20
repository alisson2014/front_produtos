import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteFn, getData } from "../../service";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Box, Title, Buttons } from "./styles";

export default function Products() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData("products")
            .then((result) => {
                setData(result);
            });
    }, []);

    return (
        <Box>
            <Title>Produtos</Title>
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
                        <th>Produto</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th style={{
                            textAlign: "center",
                            width: "256px",
                        }}>
                            Editar/Deletar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => {
                        const { id, nome, nomeCategoria, valor } = product;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{nome}</td>
                                <td>{nomeCategoria}</td>
                                <td>{valor}</td>
                                <Buttons>
                                    <Button variant="primary" onClick={() => console.log("Edit")}>
                                        <BiEdit size="20px" />
                                    </Button>
                                    <Button variant="danger" onClick={() => deleteFn(id, nome, "Categoria")}>
                                        <RiDeleteBin2Fill size="20px" />
                                    </Button>
                                </Buttons>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Box>
    );
};