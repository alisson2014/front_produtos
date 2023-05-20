import { Table, Button } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Box, Title, Buttons } from "./styles";

export default function Products() {
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
                        <th style={{
                            textAlign: "center",
                            width: "256px",
                        }}>
                            Editar/Deletar
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </Table>
        </Box>
    );
};