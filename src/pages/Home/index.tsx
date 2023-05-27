import { useState, useEffect } from "react"
import { getData, useLocalStorage } from "service";
import { Button, Table } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Categories as Form } from "components/Forms";
import { Buttons, Title, Box } from "./styles";
import { ICategories, localCategories, id } from "interface";
import Swal from "sweetalert2";
import { deleteData } from "service/delete";

export default function Home() {
    const initialState: ICategories = {
        id: "",
        nome: ""
    };

    const [categories, setCategories] = useLocalStorage<localCategories>("categories", null);
    const [propsCategorie, setPropsCategorie] = useState<ICategories>(initialState);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const editCategorie = (id: id, name: string) => {
        setPropsCategorie({ id: id, nome: name });
        handleOpen();
    };

    const registerCategorie = () => {
        setPropsCategorie(initialState);
        handleOpen();
    };

    const deleteFn = (id: id, deleted: string, typeData: string, file: string) => {
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
                                setCategories(null);
                                window.location.reload()
                            }
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
        if (categories === null || categories?.length === 0) {
            getData("categories")
                .then((result) => setCategories(result));
        }
    }, [categories, setCategories]);

    return (
        <Box>
            <Title>Categorias</Title>
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
                        <th style={{
                            textAlign: "center",
                            width: "256px",
                        }}>
                            Editar/Deletar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories !== null ? (
                        categories.map((categorie) => {
                            const { id, nome } = categorie;
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{nome}</td>
                                    <Buttons>
                                        <Button variant="primary" onClick={() => editCategorie(id, nome)}>
                                            <BiEdit size="20px" />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteFn(id, nome, "Categoria", "categories")}>
                                            <RiDeleteBin2Fill size="20px" />
                                        </Button>
                                    </Buttons>
                                </tr>
                            );
                        })
                    ) : <p>Carregando dados...</p>}
                </tbody>
            </Table>
            <Button
                variant="info"
                size="lg"
                onClick={registerCategorie}
                style={{ alignSelf: "center" }}
            >
                Nova categoria
            </Button>
            <Form
                show={show}
                props={propsCategorie}
                handleClose={handleClose}
            />
        </Box>
    );
};
