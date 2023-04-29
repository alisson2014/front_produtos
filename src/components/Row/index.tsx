import { Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Buttons } from "./styles";

export default function Row({ col }: any) {
    return (
        <tr>
            {col.map((atr: never[], i: number) => (
                <td key={i}>{atr}</td>
            ))}
            <Buttons>
                <Button variant="primary">
                    <BiEdit size="20px" />
                </Button>
                <Button variant="danger">
                    <RiDeleteBin2Fill size="20px" />
                </Button>
            </Buttons>
        </tr>
    );
};
