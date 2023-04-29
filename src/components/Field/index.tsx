import * as F from "./styles";

interface IFieldProps {
    fieldLabel: string,
    fieldValue?: string,
    fieldId: string,
    fieldType?: string
    required?: boolean,
    readonly?: boolean
    onChange?: (e: any) => void
}

export default function Field({
    fieldLabel,
    fieldValue = "",
    fieldId,
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
                value={fieldValue}
                readOnly={readonly}
                required={required}
                onChange={onChange}
            />
        </F.Container>
    );
};
