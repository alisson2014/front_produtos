import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteFn, getData } from "../../service";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Box, Title, Buttons } from "./styles";
import { Products as Form } from "../../components/Forms";

interface IProducts {
    id: string
    nome: string
    nomeCategoria: string
    valor: number
}

export default function Products() {
    const [data, setData] = useState<IProducts[]>([]);
    const [propsProduct, setPropsProduct] = useState<IProducts>({
        id: "",
        nome: "",
        nomeCategoria: "",
        valor: 0
    });

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const editProduct = (id: string, categorie: string, product: string, value: number) => {
        setPropsProduct({
            id: id,
            nome: product,
            nomeCategoria: categorie,
            valor: value
        });
        handleOpen();
    };

    const registerProduct = () => {
        setPropsProduct({
            id: "",
            nome: "",
            nomeCategoria: "",
            valor: 0
        });
        handleOpen();
    };

    useEffect(() => {
        getData("products").then((result) => setData(result));
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
                                <td>R$ {valor.toString().replace(".", ",")}</td>
                                <Buttons>
                                    <Button variant="primary" onClick={() => editProduct(id, nomeCategoria, nome, valor)}>
                                        <BiEdit size={20} />
                                    </Button>
                                    <Button variant="danger" onClick={() => deleteFn(product.id, product.nome, "Produto", "products")}>
                                        <RiDeleteBin2Fill size={20} />
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
                onClick={registerProduct}
                style={{ alignSelf: "center" }}
            >
                Nova categoria
            </Button>
            <Form
                show={show}
                handleClose={handleClose}
                {...propsProduct}
            />
        </Box>
    );
};