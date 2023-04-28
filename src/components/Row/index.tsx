import { Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default function Row({ col }: any) {
    return (
        <tr>
            {col.map((atr: never[], i: number) => (
                <td key={i}>{atr}</td>
            ))}
            <td style={{
                textAlign: "center",
                width: "192px"
            }}>
                <Button variant="primary">
                    <BiEdit size="20px" />
                </Button>
            </td>
            <td style={{
                textAlign: "center",
                width: "192px"
            }}>
                <Button variant="danger">
                    <RiDeleteBin2Fill size="20px" />
                </Button>
            </td>
        </tr>
    );
};
