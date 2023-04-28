import { Button } from "react-bootstrap";

export default function BodyRow({ col }: any) {
    return (
        <tr>
            {col.map((atr: never[], i: number) => (
                <td key={i}>{atr}</td>
            ))}
            <td
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px"
                }}
            >
                <Button variant="primary">Editar</Button>
                <Button variant="danger">Excluir</Button>
            </td>
        </tr>
    );
};
