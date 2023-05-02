import { ChangeEvent } from "react";
import * as F from "./styles";

type typeFields = "text" | "date" | "number";
interface IFieldProps {
    fieldHolder?: string
    fieldLabel: string
    fieldValue?: string | undefined | number
    fieldId: string
    fieldType?: typeFields
    required?: boolean
    readonly?: boolean
    minLength?: number | undefined
    maxLength?: number | undefined
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function Field({
    fieldHolder,
    fieldLabel,
    fieldValue = "",
    fieldId,
    minLength,
    maxLength,
    fieldType = "text",
    required = false,
    readonly = false,
    onChange
}: IFieldProps) {
    return (
        <F.Container>
            <F.Label htmlFor={fieldId}>{fieldLabel}</F.Label>
            <F.Input
                type={fieldType}
                name={fieldId}
                id={fieldId}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={fieldHolder}
                value={fieldValue}
                readOnly={readonly}
                required={required}
                onChange={onChange}
            />
        </F.Container>
    );
};
