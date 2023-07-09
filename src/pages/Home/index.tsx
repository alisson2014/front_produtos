import { useState, useEffect } from "react";
import { useLocalStorage, httpRequester } from "service";
import { deleteFn, getCategories } from "controller";
import { Button, Table, Spinner } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Categories as Form } from "components/Forms";
import { TableActions, TableButtons, Title, Page } from "styles/basics";
import { ICategories, id, localCategories } from "interface";
import { useLocation, useNavigate } from "react-router-dom";
import { normalize } from "path";

export default function Home() {
    const navigate = useNavigate();
    const [categories, setCategories, clearStorage] = useLocalStorage<localCategories>("categories", []);

    const editCategorie = (id: id): void => navigate(`/categorias/${id}`);

    const registerCategorie = (): void => navigate("/categorias/cadastrar");

    useEffect(() => {
        if (categories.length === 0) {
            httpRequester(getCategories)
                .then((result) => {
                    setCategories(result);
                });
        }
    }, []);

    return (
        <Page>
            <Title>Categorias</Title>
            <Button
                title="Cadastrar"
                type="button"
                variant="info"
                size="lg"
                onClick={registerCategorie}
            >
                <MdAddCircle size={20} />
                <span>Cadastrar</span>
            </Button>
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
                        <TableActions>Ações</TableActions>
                    </tr>
                </thead>
                <tbody>
                    {categories !== null && categories.length !== 0 ? (
                        categories.map((categorie) => {
                            const { id, nomeCategoria } = categorie;
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{nomeCategoria}</td>
                                    <TableButtons>
                                        <Button
                                            type="button"
                                            title={`Editar ${nomeCategoria}`}
                                            variant="primary"
                                            onClick={() => editCategorie(id)}
                                        >
                                            <BiEdit size={20} /><span>Editar</span>
                                        </Button>
                                        <Button
                                            type="button"
                                            title={`Excluir ${nomeCategoria}`}
                                            variant="danger"
                                            onClick={() => {
                                                deleteFn({
                                                    id: id,
                                                    deleted: nomeCategoria,
                                                    typeData: "Categoria",
                                                    file: "/categorias"
                                                }, clearStorage);
                                            }}
                                        >
                                            <RiDeleteBin2Fill size={20} /><span>Excluir</span>
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
