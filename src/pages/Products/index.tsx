import { useState, useEffect } from "react";
import { getData, deleteFn, useLocalStorage } from "service";
import { Table, Button } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Products as Form } from "components/Forms";
import { Box, Title, Buttons } from "./styles";
import { IProducts, localProducts } from "interface";

export default function Products() {
    const initialState: IProducts = {
        id: "",
        nome: "",
        nomeCategoria: "",
        valor: 0
    };

    const [products, setProducts, clearStorage] = useLocalStorage<localProducts>("products", []);
    const [propsProduct, setPropsProduct] = useState<IProducts>(initialState);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const editProduct = (props: IProducts): void => {
        setPropsProduct(props);
        handleOpen();
    };

    const registerProduct = (): void => {
        setPropsProduct(initialState);
        handleOpen();
    };

    useEffect(() => {
        if (products.length === 0) {
            getData<IProducts>("products")
                .then((result) => setProducts(result));
        }
    }, [products, setProducts]);

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
                    {products.length !== 0 ? (
                        products.map((product) => {
                            const { id, nome, nomeCategoria, valor } = product;
                            const formatedValue = valor.toString().replace(".", ",");

                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{nome}</td>
                                    <td>{nomeCategoria}</td>
                                    <td>R$ {formatedValue}</td>
                                    <Buttons>
                                        <Button title={`Editar ${nome}`} variant="primary" onClick={() => editProduct(product)}>
                                            <BiEdit size={20} />
                                        </Button>
                                        <Button title={`Excluir ${nome}`} variant="danger" onClick={() => {
                                            deleteFn({
                                                id: id,
                                                deleted: nome,
                                                typeData: "Produto",
                                                file: "products"
                                            }, clearStorage);
                                        }}>
                                            <RiDeleteBin2Fill size={20} />
                                        </Button>
                                    </Buttons>
                                </tr>
                            );
                        })
                    ) : <p>Caregando...</p>}
                </tbody>
            </Table>
            <Button
                title="Cadastrar"
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
                props={propsProduct}
            />
        </Box >
    );
};