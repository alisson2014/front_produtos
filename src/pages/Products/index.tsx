import { useState, useEffect } from "react";
import { getData, useLocalStorage } from "service";
import { Table, Button } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Products as Form } from "components/Forms";
import { Box, Title, Buttons } from "./styles";
import { IProducts, localProducts, id } from "interface";
import Swal from "sweetalert2";
import { deleteData } from "service/delete";

export default function Products() {
    const initialState: IProducts = {
        id: "",
        nome: "",
        nomeCategoria: "",
        valor: 0
    };

    const [products, setProducts] = useLocalStorage<localProducts>("products", null);
    const [propsProduct, setPropsProduct] = useState<IProducts>(initialState);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const editProduct = (
        id: id,
        categorie: string,
        product: string,
        value: number
    ) => {
        setPropsProduct({
            id: id,
            nome: product,
            nomeCategoria: categorie,
            valor: value
        });
        handleOpen();
    };

    const registerProduct = () => {
        setPropsProduct(initialState);
        handleOpen();
    };

    const deleteFn = (
        id: id,
        deleted: string,
        typeData: string,
        file: string
    ) => {
        Swal.fire({
            title: `Deseja excluir ${deleted}?`,
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sim, Deletar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(file, id).then((res) => {
                    if (res?.status) {
                        Swal.fire(
                            "Deletado!",
                            `${typeData} deletada da base de dados.`,
                            "success"
                        ).then((res) => {
                            if (res.isConfirmed) {
                                setProducts(null);
                                window.location.reload()
                            };
                        });
                    } else {
                        Swal.fire("Erro!", "Erro ao deletar na base de dados.", "error").then(
                            (res) => res.isConfirmed && window.location.reload()
                        );
                    }
                });
            }
        });
    };


    useEffect(() => {
        if (products === null || products.length === 0) {
            getData("products")
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
                    {products !== null ? (
                        products.map((product) => {
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
                        })
                    ) : <p>Caregando...</p>}
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
                props={propsProduct}
            />
        </Box>
    );
};