import * as F from "./styles";
import { useForm } from "react-hook-form";

type typeFields = "text" | "date" | "number";
interface IFieldProps {
    fieldHolder?: string
    fieldLabel: string
    fieldId: string
    fieldType?: typeFields
    required?: boolean
    readonly?: boolean
    minLength?: number | undefined
    maxLength?: number | undefined
};

export default function Field({
    fieldHolder,
    fieldLabel,
    fieldId,
    minLength,
    maxLength,
    fieldType = "text",
    required = false,
    readonly = false,
}: IFieldProps) {
    const { register } = useForm();

    return (
        <F.Container>
            <F.Label htmlFor={fieldId}>{fieldLabel}</F.Label>
            <F.Input
                type={fieldType}
                id={fieldId}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={fieldHolder}
                readOnly={readonly}
                required={required}
                {...register(fieldId)}
            />
        </F.Container>
    );
};
