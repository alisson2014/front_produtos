import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    useLocalStorage,
    httpRequester,
    deleteFn,
    getCategories
} from "service";
import { Button, Table, Spinner } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { TableActions, TableButtons, Title, Page, Top } from "styles/basics";
import { id, localCategories } from "interface";

export default function Home() {
    const navigate = useNavigate();
    const [categories, setCategories, clearStorage] = useLocalStorage<localCategories>("categorias", []);

    const editCategorie = (id: id): void => navigate(`/categorias/${id}`);
    const registerCategorie = (): void => navigate("/categorias/cadastrar");

    useEffect(() => {
        if (categories.length === 0) {
            httpRequester(getCategories)
                .then((result) => setCategories(result));
        }
    }, []);

    return (
        <Page>
            <Top>
                <Title>Lista de categorias</Title>
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
                        <th>Categoria</th>
                        <TableActions>Ações</TableActions>
                    </tr>
                </thead>
                <tbody>
                    {categories.length !== 0 ? (
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
