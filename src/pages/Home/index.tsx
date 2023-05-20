import { useState, useEffect } from "react"
import { Container, Button, Table } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi"
import { Buttons, Title } from "./styles";
import { getData, deleteData } from "../../service";
import FormCategorie from "../../components/FormCategorie";

interface Categories {
    id: string
    nome: string
}

export default function Home() {
    const [data, setData] = useState<Categories[]>([]);
    const [propsCategorie, setPropsCategorie] = useState<Categories>({
        id: "",
        nome: ""
    });
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const editCategorie = (id: string, categorie: string) => {
        setPropsCategorie({
            id: id,
            nome: categorie
        });
        handleOpen();
    };

    const deleteCategorie = (id: string, category: string) => {
        Swal.fire({
            title: `Deseja excluir ${category}?`,
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sim, Deletar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData("categories", id)
                    .then((res) => {
                        if (res?.status) {
                            Swal.fire(
                                "Deletado!",
                                "Categoria deletada da base de dados.",
                                "success"
                            ).then((res) => {
                                if (res.isConfirmed) window.location.reload();
                            });
                        } else {
                            Swal.fire(
                                "Erro!",
                                "Erro ao deletar na base de dados.",
                                "error"
                            ).then((res) => {
                                if (res.isConfirmed) window.location.reload();
                            });
                        }
                    });
            }
        });
    };

    const registerCategorie = () => {
        setPropsCategorie({
            id: "",
            nome: ""
        });
        handleOpen();
    };

    useEffect(() => {
        getData("categories")
            .then((result) => {
                setData(result);
            });
    }, []);

    return (
        <Container>
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
                    {data.map((categorie) => {
                        const { id, nome } = categorie;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{nome}</td>
                                <Buttons>
                                    <Button variant="primary">
                                        <BiEdit size="20px" onClick={() => editCategorie(id, nome)} />
                                    </Button>
                                    <Button variant="danger">
                                        <RiDeleteBin2Fill size="20px" onClick={() => deleteCategorie(id, nome)} />
                                    </Button>
                                </Buttons>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <center>
                <Button
                    variant="info"
                    size="lg"
                    onClick={registerCategorie}
                >
                    Nova categoria
                </Button>
            </center>
            <FormCategorie
                show={show}
                props={propsCategorie}
                handleClose={handleClose}
            />
        </Container>
    );
};
