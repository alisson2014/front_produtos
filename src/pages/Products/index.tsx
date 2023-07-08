import { useState, useEffect } from "react";
import { useLocalStorage, httpRequester } from "service";
import { deleteFn, getProducts } from "controller";
import { Table, Button, Spinner } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { MdAddCircle } from "react-icons/md";
import { Products as Form } from "components/Forms";
import { Page, Title, TableButtons, TableActions } from "styles/basics";
import { IProducts, localProducts } from "interface";

export default function Products() {
    const initialState: IProducts = {
        id: "",
        nome: "",
        nomeCategoria: "",
        valor: 0
    };

    const [products, setProducts, removeProducts] = useLocalStorage<localProducts>("products", []);
    const [propsProduct, setPropsProduct] = useState<IProducts>(initialState);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => {
        setPropsProduct(initialState);
        setShow(false)
    };
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
            httpRequester(getProducts)
                .then((result) => setProducts(result));
        }
    }, [products, setProducts]);

    return (
        <Page>
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
                        <TableActions>Ações</TableActions>
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
                                    <TableButtons>
                                        <Button
                                            title={`Editar ${nome}`}
                                            variant="primary"
                                            onClick={() => editProduct(product)}
                                            type="button"
                                        >
                                            <BiEdit size={20} />
                                            <span>Editar</span>
                                        </Button>
                                        <Button
                                            title={`Excluir ${nome}`}
                                            variant="danger"
                                            type="button"
                                            onClick={() => {
                                                deleteFn({
                                                    id: id,
                                                    deleted: nome,
                                                    typeData: "Produto",
                                                    file: "products"
                                                }, removeProducts);
                                            }}
                                        >
                                            <RiDeleteBin2Fill size={20} />
                                            <span>Excluir</span>
                                        </Button>
                                    </TableButtons>
                                </tr>
                            );
                        })
                    ) : <Spinner variant="primary" />}
                </tbody>
            </Table>
            <Button
                title="Cadastrar"
                variant="info"
                size="lg"
                onClick={registerProduct}
                style={{ alignSelf: "center" }}
            >
                <MdAddCircle size={20} />
                <span>Cadastrar</span>
            </Button>
            <Form
                show={show}
                handleClose={handleClose}
                props={propsProduct}
            />
        </Page >
    );
};