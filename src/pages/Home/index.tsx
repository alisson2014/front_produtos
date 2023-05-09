import { useState, useEffect } from "react"
import { Container, Button, Table } from "react-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi"
import { Buttons, Title } from "./styles";
import { getData } from "../../service";
import FormCategorie from "../../components/FormCategorie";

type idType = undefined | number;

interface Categories {
    id: idType
    nomeCategoria: string
}

export default function Home() {
    //Estado que guarda os dados da api
    const [data, setData] = useState<Categories[]>([]);

    //Estado que guarda o id e nome da categoria
    const [propsCategorie, setPropsCategorie] = useState<Categories>({
        id: undefined,
        nomeCategoria: ""
    });

    //Estado do modal
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const editCategorie = (id: idType, categorie: string) => {
        setPropsCategorie({
            id: id,
            nomeCategoria: categorie
        });
        handleOpen();
    }

    const deleteCategorie = async (id: idType): Promise<void> => {
        await fetch(`http://localhost/produtosLike/delete.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
            .finally(() => console.info("Fim"));
    }

    const registerCategorie = () => {
        setPropsCategorie({
            id: undefined,
            nomeCategoria: ""
        });
        handleOpen();
    }

    useEffect(() => {
        getData("http://localhost/produtosLike/")
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
                    {Object.values(data).map((categorie) => {
                        const { id, nomeCategoria } = categorie
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{nomeCategoria}</td>
                                <Buttons>
                                    <Button variant="primary">
                                        <BiEdit size="20px" onClick={() => editCategorie(id, nomeCategoria)} />
                                    </Button>
                                    <Button variant="danger">
                                        <RiDeleteBin2Fill size="20px" onClick={() => {
                                            if (confirm(`Deseja excluir a categoria ${nomeCategoria}?`)) {
                                                deleteCategorie(id);
                                            }
                                        }} />
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
                setProps={setPropsCategorie}
                handleClose={handleClose}
            />
        </Container>
    );
};
