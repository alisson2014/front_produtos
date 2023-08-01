import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    useLocalStorage,
    httpRequester,
    deleteFn,
    getProducts
} from "service";
import { Table, Button, Spinner } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { MdAddCircle } from "react-icons/md";
import {
    Page,
    Title,
    TableButtons,
    TableActions,
    Top
} from "styles/basics";
import { localProducts, id } from "interface";

export default function Products() {
    const navigate = useNavigate();

    const [products, setProducts, removeProducts] = useLocalStorage<localProducts>("produtos", []);

    const editProduct = (id: id): void => navigate(`/produtos/${id}`);
    const registerProduct = (): void => navigate("/produtos/cadastrar");

    useEffect(() => {
        if (products.length === 0) {
            httpRequester(getProducts)
                .then((result) => setProducts(result));
        }
    }, [products, setProducts]);

    return (
        <Page>
            <Top>
                <Title>Lista de produtos</Title>
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
            </Top>
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
                            const { id, nomeProduto, categoria, valor } = product;
                            const formatedValue = valor.toString().replace(".", ",");

                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{nomeProduto}</td>
                                    <td>{categoria}</td>
                                    <td>R$ {formatedValue}</td>
                                    <TableButtons>
                                        <Button
                                            title={`Editar ${nomeProduto}`}
                                            variant="primary"
                                            onClick={() => editProduct(id)}
                                            type="button"
                                        >
                                            <BiEdit size={20} />
                                            <span>Editar</span>
                                        </Button>
                                        <Button
                                            title={`Excluir ${nomeProduto}`}
                                            variant="danger"
                                            type="button"
                                            onClick={() => {
                                                deleteFn({
                                                    id: id,
                                                    deleted: nomeProduto,
                                                    typeData: "Produto",
                                                    file: "produtos"
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
                    ) : (
                        <tr>
                            <td><Spinner variant="primary" /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Page >
    );
};